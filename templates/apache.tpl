- hosts: all
  remote_user: root
  become: yes
  handlers:
    - name: restart apache2
      service: name=apache2 state=restarted
  tasks:
    - name: Install apache
      apt: name=apache2 state=latest
    - name: ajcepeda vh file
      vars:
        http_port: 80
        domain: ajcepeda.com
      template: src=virtualhost.conf dest=/etc/apache2/sites-available/ajcepeda.conf
    - name: enable ajcepeda
      command: a2ensite ajcepeda
      args:
        creates: /etc/apache2/sites-available/ajcepeda.conf
      notify:
        - restart apache2

    - name: npm ajcepeda
      command: npm install chdir=/sources/ajcepeda