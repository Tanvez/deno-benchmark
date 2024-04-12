## How to test http load test
1. Update Dockerfile with the chosen runtime and command. Create `.env` file and copy values from `.env.example`.
2. docker-compose build && docker-compose up
3. open localhost grafana on browser (localhost:3000) with username: admin, password: admin1
   - prepare graphs for metrics `nodejs_memory_usage_in_bytes` and `nodejs_cpu_usage_in_percentage`
4. [install k6](https://k6.io/docs/get-started/installation/) and run load test
   - k6 run src/http-request-load-test.js or 
5. View metrics on grafana
6. docker-compose down