import paramiko
import sys

hostname = "46.202.162.27"
username = "root"
password = "Ashik@#730646"
command = "pm2 logs thoughtry-api --lines 50 --nostream"

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    client.connect(hostname, username=username, password=password, timeout=10)
    stdin, stdout, stderr = client.exec_command(command)
    
    out = stdout.read().decode('utf-8', errors='ignore').strip()
    err = stderr.read().decode('utf-8', errors='ignore').strip()
    
    with open("deploy_log.txt", "w", encoding="utf-8") as f:
        f.write(f"STDOUT:\n{out}\nSTDERR:\n{err}")
        
except Exception as e:
    pass
finally:
    client.close()
