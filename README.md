# todoapp
simple todo app



## TODO API

| Name | Method | Url | Descryption |
| ---- | ------ | --- | ----------- |
| Create | POST | /todoapi/create | create new todo |
| Read | GET | /todoapi/read/:id | read todo by id |
| List | GET | /todoapi/list | list all todos |
| Set As Complete | PUT | /todoapi/complete/:id | set todo as completed by id |
| Set As Not Complete | PUT | /todoapi/notcomplete/:id | set todo as not completed by id |
| Delete | DELETE | /todoapi/delete/:id | delete todo by id |


## USER API

| Name | Method | Url | Descryption |
| ---- | ------ | --- | ----------- |
| Register | POST | /userapi/register | register new user |
| Login | POST | /userapi/login | login user and get access token |
| Logout | GET | /userapi/logout | logout user |
| Update | PUT | /userapi/update | update user data [Token Is Needed] |
| Delete | DELETE | /userapi/delete | delete user [Token Is Needed] |
