- hosts: all
  remote_user: root
  become: yes
  tasks:
  {{#each groups}}
    - name: Create {{ this }} group
      group: name={{ this }} state=present
  {{/each}}

  {{#each users}}
    - name: create {{ @key }} user
      user: name={{ @key }}
        createhome=yes 
        groups={{#each this.groups}}{{ this }}{{#unless @last}},{{/unless}}{{/each}}
        state=present
        update_password=on_create
      register: {{ @key }}
   
    - name: Prompt {{ @key }} reset password
      shell: chage -d 0 {{ @key }}
      when: {{ @key }}.changed
  {{/each}}
