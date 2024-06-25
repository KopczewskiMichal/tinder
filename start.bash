kubectl apply -f ./front/deployment.yaml
kubectl apply -f ./front/service.yaml

kubectl apply -f ./server/deployment.yaml
kubectl apply -f ./server/service.yaml

kubectl apply -f ./mongo-deployment.yaml
kubectl apply -f ./mongo-service.yaml
# kubectl apply -f ./mongo-pvc.yaml

kubectl apply -f ./proxy-config-map.yaml
kubectl apply -f ./proxy-deployment.yaml
kubectl apply -f ./proxy-service.yaml