# Sources
https://dev.to/johannesvitt/deploy-a-react-app-on-gcp-with-google-cloud-run-il3
https://medium.com/swlh/deploying-a-react-app-to-google-cloud-run-with-github-actions-ae24ac6cb85a

# Commands
gcloud builds submit --tag gcr.io/gifted-pulsar-345708/itn5front
gcloud run deploy --image gcr.io/gifted-pulsar-345708/itn5front --platform managed --port 8080

# Site
https://itn5front-y5c3h4ocuq-wl.a.run.app/