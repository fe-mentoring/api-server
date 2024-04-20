# API Server for fe-mentoring

[fe-mentoring](https://github.com/fe-mentoring)을 위한 API 서버입니다.

## 환경 변수

```shell
# DB
DATABASE_URL="file:./dev.db"

# Auth
JWT_SECRET="AWESOME_SECRET"

# Swagger
SWAGGER_USER="HELLO_WORLD"
SWAGGER_PASSWORD="abcd1234"
```

## 실행 방법

### 1. 환경 변수 설정 (.env 파일 생성)

```shell
# DB
DATABASE_URL="file:./dev.db"

# Auth
JWT_SECRET="AWESOME_SECRET"

# Swagger
SWAGGER_USER="HELLO_WORLD"
SWAGGER_PASSWORD="abcd1234"
```

### 2. 서버 실행

```shell
$ pnpm install
$ pnpm start:dev
```
