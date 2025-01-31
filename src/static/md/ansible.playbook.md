##### Documentation

 + Official site
   + https://docs.ansible.com/
 + playbook 
   + https://docs.ansible.com/ansible/latest/user_guide/playbooks.html

##### playbook example
```
---
- hosts: webservers
  vars:
    http_port: 80
    max_clients: 200
  remote_user: root
  tasks:
  - name: ensure apache is at the latest version
    yum:
      name: httpd
      state: latest
  - name: write the apache config file
    template:
      src: /srv/httpd.j2
      dest: /etc/httpd.conf
    notify:
    - restart apache
  - name: ensure apache is running
    service:
      name: httpd
      state: started
  handlers:
    - name: restart apache
      service:
        name: httpd
        state: restarted
```

###### vars example(Variable configuration)
```yaml
vars:
  key1: value1
  key2: value2
```

###### tags example(Tag configuration，Optional execution)
```yaml
tasks:
  - name: Task 1
    tags: task1
    choose: true
  - name: Task 2
    tags: task2
    choose: false
```