# AWS Free Tier Integration with Hustle.ai

This document outlines how the Hustle.ai auto-apply system maps perfectly to the **AWS Free Tier**, utilizing **BullMQ** as the core job queue while avoiding services like SQS.

## Architecture Diagram

The following diagram illustrates how your services communicate optimally across AWS Free Tier resources.

```mermaid
graph LR
    %% Simple Colors for readability
    classDef user fill:#4CAF50,stroke:#2E7D32,stroke-width:2px,color:white,rx:6,ry:6
    classDef core fill:#2196F3,stroke:#1565C0,stroke-width:2px,color:white,rx:6,ry:6
    classDef storage fill:#FF9800,stroke:#E65100,stroke-width:2px,color:white,rx:6,ry:6
    classDef logs fill:#607D8B,stroke:#37474F,stroke-width:2px,color:white,rx:6,ry:6

    %% Nodes
    User[User Browser]:::user
    
    API[Node.js API\n(AWS EC2)]:::core
    DB[(Database\nPostgreSQL)]:::storage
    Queue[(BullMQ / Redis\nAWS ElastiCache)]:::storage
    
    Worker[Python ML Worker\n(AWS EC2)]:::core
    S3[(Amazon S3\nResume Storage)]:::storage
    Logs((CloudWatch Logs)):::logs

    %% Main Flow
    User -->|1. Submit Application| API
    
    API -->|2. Save Data| DB
    API -->|3. Send Job| Queue
    
    Queue -->|4. Process Job| Worker
    
    Worker -->|5. Save PDF Resume| S3
    
    %% Logging (Dotted so it's not distracting)
    API -.-> Logs
    Worker -.-> Logs
```

---

## 🚀 Integration Breakdown by Phase

### 1. **Phase 2: Job Queue Integration**
- **Service:** Amazon ElastiCache (Redis) or Self-Hosted EC2 Redis.
- **Why it Helps:** Allows `BullMQ` to handle retry logic, delayed jobs, and concurrent polling without managing memory limits locally. The Free Tier covers 750 hours/month of a `cache.t2.micro` instance. Alternatively, it can run as a Docker container exactly as it does locally on a free EC2 instance.

### 2. **Phases 3 & 4: Python Worker & NLP Microservice**
- **Service:** Amazon EC2 (`t2.micro` or `t3.micro`).
- **Why it Helps:** Separating the heavy Machine Learning and NLP analysis processing from the Node.js API server guarantees that processing heavy resumes does not bring down the main API server. We maximize the 750 hours/mo EC2 free tier.

### 3. **Phase 5: Document Generation & Storage**
- **Service:** Amazon S3 (Simple Storage Service).
- **Why it Helps:** Local disk operations (like the `/generated/` folder) do not naturally scale when moving to multiple servers. You get 5 GB of standard storage for 12 months for free. You will pass presigned S3 URLs to the Client Interface or Database rather than locking files to a specific server.

### 4. **Phase 7: Reliability, Security, and Observability**
- **Service:** Amazon CloudWatch Logs & IAM (Identity and Access Management).
- **Why it Helps:** Instead of parsing arbitrary `.log` files locally across multiple folders, CloudWatch ingests everything directly from backend and ML Workers (5 GB free ingestion/mo). IAM lets you safely attach a role to an EC2 instance that allows S3 uploads—meaning you don't even have to write access keys in your `.env` files.

---

### **Cost Optimization Best Practices (To keep it 100% Free)**
1. **Consolidation**: If traffic is low initially, both Node.js API and ML Workers can technically run on the *same* EC2 `t2.micro` instance (up to 1GB of RAM).
2. **Setup CloudWatch Alarms**: AWS Billing alerts should drop you an email if you stray above ₹1 on the account, catching potential errors immediately.
3. **Data Lifecycle Policies**: To avoid breaking S3's 5GB free limit limit over the first year, set a lifecycle policy on the S3 bucket to auto-delete generated PDF resumes after 30 days (assuming users only need them temporarily).
