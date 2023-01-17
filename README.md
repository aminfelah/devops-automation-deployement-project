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


# LOGS ( AGENT DATADOG ) + (WINSTON FROM THE APPLICATION CLIENT)
![image](https://user-images.githubusercontent.com/60293387/212932245-6997b8b5-09d7-498f-915d-4430fb830ba5.png)
STRUCTURE OF LOGS
![image](https://user-images.githubusercontent.com/60293387/212932410-e340c80d-7f50-4a13-b766-beae84f26f22.png)


![image](https://user-images.githubusercontent.com/60293387/212932857-aa755ed2-3c17-4854-943b-84e4149399c0.png)

#  TRACES ( DATADOG and OPENTELEMETRY ) auto instrumented
![image](https://user-images.githubusercontent.com/60293387/212933269-5ffed5d2-2d36-4e06-80e6-c0dd36552ba7.png)


# HELM SHARDS
WE USED 3 HELM SHARDS :

- MUSIC APP 
- PROMETHEUS ( to SET OUR VALUES WHEN INSTALLING PROMETHEUS HELM + SAVED THE OUTPUT )
- DATADOGS ( to SET OUR VALUES WHEN INSTALLING DATA DOG ) 
![image](https://user-images.githubusercontent.com/60293387/212935013-a025526a-7ad4-43ec-a0e1-87a27f643d2c.png)

WE USE ALSO HELM SHARDS TO CHANGE BETWEEN DIFFERENT ENVIRONMENTS:
- DEV 
- TEST 
- PROD 

WE ALSO USE SHARDS VALUE TO PICK BETWEEN BETWEEN BLUE AND GREEN AS LABELS 
![image](https://user-images.githubusercontent.com/60293387/212936047-8e856d71-d040-48f5-9224-4bb1511962e5.png)

BECAUSE USED BLUE GREEN ROLL OUT ALL AT ONCE (TRIED  argoproj.io/v1alpha1) 
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: rollout-bluegreen
spec:
[...] # this part of the template is identical to a regular Deployment
  strategy:
    blueGreen: 
      activeService: rollout-bluegreen-active
      previewService: rollout-bluegreen-preview
      autoPromotionEnabled: false ```
```
 THE BLUE GREEN DEPLOYEMENT DIDN'T WORK OUT 


### AUTOMATIC PROVISIONING 

## TERRAFORM MICRO STACKS (2 stacks to create cluster and to install helm sharts in the clusters itself) 
![image](https://user-images.githubusercontent.com/60293387/212941648-8ad672ff-3dc4-4bf0-ac1e-45b72415b94f.png)

WE ALSO AUTOMATED THE PROVISION OF A STAND ALONE VIRTUAL MACHINE THAT'S SUPPOSED TO RUN A PYTHON SCRIPT TO SCRAPE ALL SONGS DATA (NAME ARTIST IMAGE)

WE ALSO AUTOMATED THE CONFIGURATION OF THAT MACHIBE USING ANSIBLE PLAYBOOK TO INSTALL ALL DEPENDANCIES FOR PYTHON AND RUNNING THE SCRIPT 
```yaml 
- name: WebserverPlaybook
  hosts: webserver
  become: true
  tasks:
    - name: Install BeautifulSoup python package
      ansible.builtin.pip:
        name: beautifulsoup4
    - name: Install pandas python package
      ansible.builtin.pip:
        name: pandas
    - name: Install request python package
      ansible.builtin.pip:
        name: requests
    - name: Copy the script
      template:
        src: ./server/scrape-script.py
        dest: /home/{{ ansible_user }}/scrape-script.py
    - name: launch script  
      ansible.builtin.command: python3 /home/{{ ansible_user }}/scrape-script.py
    - name: log script  
      ansible.builtin.command: echo "this script has finished"
      ```
