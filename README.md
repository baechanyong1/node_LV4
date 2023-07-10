# node_LV2

ERD설계

![image](https://github.com/baechanyong1/node_LV4/assets/110149885/e0b30463-9d5f-404f-9170-984e5b6c822c)




파일구조
```
node_LV2
├─ app.js
├─ config
│  └─ config.json
├─ middlewares
│  └─ auth-middleware.js
├─ migrations
│  ├─ 20230623012409-create-users.js
│  ├─ 20230623012412-create-user-infos.js
│  ├─ 20230623012416-create-posts.js
│  └─ 20230623012419-create-comments.js
├─ models
│  ├─ comments.js
│  ├─ index.js
│  ├─ posts.js
│  ├─ userinfos.js
│  └─ users.js
├─ package-lock.json
├─ package.json
├─ README.md
├─ routes
│  ├─ comments.js
│  ├─ posts.js
│  └─ users.js
└─ seeders

```


posts테이블의 컬럼 like => Likes 테이블 생성 후 Likes에 저장 중 SequelizeForeignKeyConstraintError 외래키를 참조 할 수 없는 에러 발생
