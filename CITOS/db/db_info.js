module.exports = (function () {

  config = {};

// cloud env
if (process.env.VCAP_SERVICES) {
  // cloud env 설정. 데이터 구조는 2.3.4 VCAP_SERVICES 환경정보 참고
  var cloud_env   = JSON.parse(process.env.VCAP_SERVICES);
  var mysql_env   = cloud_env["Mysql-DB"][0]["credentials"];

  config = {
    host:mysql_env.hostname,
    user:mysql_env.username,
    password:mysql_env.password,
    database:mysql_env.name
  };
} else {
  // local env
  config =  {
    host     : 'localhost',
    user     : 'devel',
    password : 'devel',
    database : 'citos',
    multipleStatements : true

}
}
  return config;
})();
