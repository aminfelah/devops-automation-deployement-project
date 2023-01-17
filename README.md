# devops-automation-deployement-project

## THIS A PROJECT FOR DEVOPS DEPLOYEMENT AND AUTOMATION 

### MICROSERVICES USED 

- LOGIN MICROSERVICE (nodejs ---> to assure auth with jwt)
- SONG API MICROSERVICE (nodejs ---> will send the music info like the image and song title)
- MUSIC FRONTEND (frontend exposed to the internet as ui for all users)


### ARCHITECTURE 

![image](https://user-images.githubusercontent.com/60293387/212919854-3962f277-5942-4aa9-98ec-45e01d2a30d7.png)


### THE DATABASE IS EXTERNAL (MONGO DB ATLAS)
![image](https://user-images.githubusercontent.com/60293387/212920834-59e8790e-0b5d-4f37-8654-adcf1e82b9fd.png)


### ALL THE MICROSERVICES ARE DOCKERIZED

- There is images for tests environments 
- There is images for dev environments 
- There is images for prod environments

![image](https://user-images.githubusercontent.com/60293387/212921515-a3003156-3c07-464f-b564-540ba90fd4a1.png)

<hr/>

# INFRASTRUCTURE 
WORKED ON AZURE AS WELL AS ON KIND (locally)
![image](https://user-images.githubusercontent.com/60293387/212924196-8a451cde-4ccd-490e-90ba-6d19dcda5929.png)
![image](https://user-images.githubusercontent.com/60293387/212924489-78af37fb-4785-489d-a400-d6b9d82e9365.png)


 
LOCALLY THERE IS THE CONFIGURATION FOR THE CLUSTER USING KIND

`.main/infrastructure/cluster-config`

```yml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  kubeadmConfigPatches:
  - |
    kind: InitConfiguration
    nodeRegistration:
      kubeletExtraArgs:
        node-labels: "ingress-ready=true"
  extraPortMappings:
  - containerPort: 80
    hostPort: 80
    protocol: TCP
  - containerPort: 443
    hostPort: 443
    protocol: TCP

```
# DEVOPS TOOLS (METRICS - TRACES - LOGS)

## METRICS ( HOST METRICS : SEMATEXT AGENT ) 
![image](https://user-images.githubusercontent.com/60293387/212927113-48906461-7135-4c68-86b9-2ec1234bd7ec.png)
![image](https://user-images.githubusercontent.com/60293387/212927224-e22198a3-c158-4010-b996-4032c9fe1f15.png)
![image](https://user-images.githubusercontent.com/60293387/212927347-3819b161-123d-454b-b29d-96fb24696923.png)
![image](https://user-images.githubusercontent.com/60293387/212927588-96922350-86cf-454a-a598-03133c75e1be.png)
![image](https://user-images.githubusercontent.com/60293387/212927741-ee5b6356-4787-49b6-823e-1068f58bfaa6.png)

## METRICS ( APP METRICS : PROMETHEUS + GRAFANA (PULL BASED) COUNTERS ) 
WE CAN PORTFORAWRD TO THE PROMETHEUS BY CREATING A TUNNEL (IF WE FOLLOW THE GOOD PRACTICIES WE MUST ENABLE RBAC OR SET PERMISSION KEY )
![image](https://user-images.githubusercontent.com/60293387/212928996-fc36c639-5be0-48e8-8615-dc816bef75ab.png)
![image](https://user-images.githubusercontent.com/60293387/212929210-28ecf9e7-b60f-4a9a-9d3d-80473b46913d.png)
###  GRAFANA VISUALISATION FOR PROMETHEUS
![image](https://user-images.githubusercontent.com/60293387/212929910-afe957d4-6841-4fe4-a2e0-b298a7080b81.png)
![image](https://user-images.githubusercontent.com/60293387/212930654-ca15a6ff-9d55-4911-8c53-ebc4c6596ae1.png)

