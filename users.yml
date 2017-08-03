- hosts: all
  remote_user: root
  become: yes
  tasks:
    - name: create developers
      group: name=developers state=present
    - name: create alfred
      user: name=alfred
        password= "{{ 'password' | password_hash('sha512') }}" 
        createhome=yes 
        groups=sudo,developers
        state=present
        update_password=on_create
      register: alfred
    - name: alfred reset password
      shell: chage -d 0 alfred
      when: alfred.changed
