# todoapp
simple todo app



## TODO API

| Name | Method | Url | Descryption |
| ---- | ------ | --- | ----------- |
| Create | POST | /todos | create new todo |
| Read | GET | /todos/:id | read todo by id |
| List | GET | /todos/ | list all todos |
| Edit | PATCH | /todos/:id | update todo content by id |
| Set As Complete | PATCH | /todos/:id/complete | set todo as completed by id |
| Set As Not Complete | PATCH | /todos/:id/notcomplete | set todo as not completed by id |
| Delete | DELETE | /todos/:id | delete todo by id |


## USER API

| Name | Method | Url | Descryption |
| ---- | ------ | --- | ----------- |
| Register | POST | /users/register | register new user |
| Login | POST | /users/login | login user and get access token |
| Logout | GET | /users/logout | logout user [Token Is Needed] [Not Tested] |
| Update | PATCH | /users | update user data [Token Is Needed] [Not Working] |
| Delete | DELETE | /users | delete user [Token Is Needed] [Not Working] |
