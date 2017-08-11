- hosts: all
  remote_user: root
  become: yes
  tasks:
  {{#each users}}
    Hello
    {{#if gits}}
      {{#each gits}}
    - name: Clone {{ @key }} for {{ @../key }}
        {{#with (lookup ../../gits this) as |gitObj|}}
      git: repo={{ gitObj.repo }}
        dest=/home/{{ @../key }}/repos/{{ @key }}
        key_file=/home/{{ @../key }}/.ssh/id_rsa
        accept_hostkey=true
         {{#if gitObj.version}}
        version={{ gitObj.version }}
          {{/if}}
          {{#if gitObj.umask}}
        umask={{ gitObj.umask }}
         {{/if}}
        {{/with}}
      {{/each}}
    {{/if}}
  {{/each}}
