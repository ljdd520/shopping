/**
 * 项目的验证工具类
 */

  /**
   * 验证邮箱
   */
  exports.verify_email = function (email) {
    const is_email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return is_email.test(email);
  };
  
  /**
   * 密码验证，必须是6-16位数字或字母组成
   */
  exports.verify_password = function (password) {
    const is_password = /^[0-9a-zA-Z`~!@#$%^&*()-_+=\{\}\[\]\;\:\"\'\?\/\\]{6,16}$/;
    return is_password.test(password);
  };

  /**
   *昵称验证，必须是字符加数字
   */
  exports.verify_userName=function (userName) {
    const is_userName=/^[0-9A-Za-z]*$/;
    return is_userName.test(userName);
  };

  /**
   *中文名验证，必须是中文
   */
  exports.verify_chinaName=function (chinaName) {
    const is_chinaName=/^[\u4e00-\u9fa5]+$/g;
    return is_chinaName.test(chinaName);
  };