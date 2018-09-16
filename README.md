# 주문받아요

CITOS-server입니다.

```bash
개발환경
node.js 8.11.3
mysql 

클라우드 환경
Paas-Ta

```

restapi url

|기능|세부기능|Call|메소드|url|body|
|---|---|---|---|---|---|
|회원가입|-|App|post|/user/signup|id,pw, ETC...
|로그인|-|App|post|/user/signin|id,pw
|탈퇴|-|App|delete|/user/signout|id,pw

|기능|세부기능|Call|메소드|url|body|
|---|---|---|---|---|---|
|카드|조회|App|get|/card/:id|-|
|카드|등록|App|post|/card/add|cardNum, YY, MM, ETC|
|카드|삭제|App|delete|/card/remove|id, cardNum, YY, MM|
|카드|수정|App|put|/card/edit|cardNum, YY, MM, ETC|

|기능|세부기능|Call|메소드|url|body|
|---|---|---|---|---|---|
|결제|qrcode 이미지 기반 결제 시|App|post|/charge/qrcode|id, qrcodeid, ETC|
|qrcode|결제 정보를 qrcode화 함|Device|post|/qrcode|-|