kubectl delete -f ./front/deployment.yaml
kubectl delete -f ./front/service.yaml

kubectl delete -f ./server/deployment.yaml
kubectl delete -f ./server/service.yaml

kubectl delete -f ./mongo-deployment.yaml
kubectl delete -f ./mongo-service.yaml
# kubectl delete -f ./mongo-pvc.yaml

