const localsMiddleware  = (req, res, next) => {
    res.locals.user = req.user || {};
    next();
}

// res.locals 클라이언트로 변수들을 보낼 수 있다.

export { localsMiddleware }

//https://ko.javascript.info/import-export#ref-4122