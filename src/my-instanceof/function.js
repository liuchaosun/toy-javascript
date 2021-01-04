const OBJECT_TYPE = 'object';
const OBJECT_FLAG = '[object ';

// 实现一个可以用来获取传入数据的私有 Class 属性的方法
const GetValueClass = function (value) {
  // 判断是否是基础类型
  if (typeof value !== OBJECT_TYPE) {
    // 不是基础类型则转化后输出
    let type = typeof value;
    type = type.charAt(0).toUpperCase() + type.substring(1);
    return type;
  }

  let classString = Object.prototype.toString.call(value);
  return classString.substring(OBJECT_FLAG.length, classString.length - 1);
};

// 实现一个 MyInstanceof 功能类似于 instanceof
const MyInstanceof = function (value, typeString) {
  // 获取私有属性
  let type = GetValueClass(value);
  // 判断私有属性的值
  return type === typeString;
};

module.exports = MyInstanceof;
