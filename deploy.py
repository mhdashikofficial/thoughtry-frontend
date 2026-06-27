import paramiko
import sys

hostname = "46.202.162.27"
username = "root"
password = "Ashik@#730646"
command = "cd /root/thoughtry-frontend && git stash && git pull && pm2 restart all"

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    print(f"Connecting to {hostname}...")
    client.connect(hostname, username=username, password=password, timeout=10)
    print("Connected! Running command...")
    stdin, stdout, stderr = client.exec_command(command)
    
    out = stdout.read().decode('utf-8', errors='ignore').strip()
    err = stderr.read().decode('utf-8', errors='ignore').strip()
    
    with open("deploy_log.txt", "w", encoding="utf-8") as f:
        f.write(f"STDOUT:\n{out}\nSTDERR:\n{err}")
        
    print("Deployment completed successfully. See deploy_log.txt")
except Exception as e:
    print(f"Failed to connect or run command: {e}")
finally:
    client.close()
