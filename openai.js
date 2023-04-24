async function getOpenAIUsage(apiKey, date) {
  // 计算起始日期和结束日期
  const now = new Date();
  startDate = new Date(now - 90 * 24 * 60 * 60 * 1000); // 现在的时间往前80天，因为4月1号到期了，现在是7月1号到期。初步推断api的寿命为90天。
  const endDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 当前日期往后算一天
  var urlUsage = `https://api.openai.com/v1/dashboard/billing/usage?start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}`; // 查使用量
  // var url = "https://api.openai.com/v1/usage";
  // 订阅信息请求地址
  const urlSubscription = "https://api.openai.com/v1/dashboard/billing/subscription"; // 查是否订阅

  //发生请求
  let response = await fetch(urlSubscription, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
    },
  });

  // 检测响应是否成功
  if (!response.ok) {
    console.log("您的账号已被封禁，请登录OpenAI进行查看");
    return;
  }
  // 解析响应-订阅数据
  const subscripttionData = await response.json();

  // 判断是否过期
  const timestamp_now = Math.floor(Date.now() / 1000); // 现在的时间
  const timestamp_expire = subscripttionData.access_until; // 到期的时间
  console.log(timestamp_expire, "到期的时间");
  console.log(subscripttionData, "解析的数据");
  if (timestamp_now > timestamp_expire) {
    alert("账户额度已过期，请登录OpenAI进行查看");
  }
  /* return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data:", data);
      console.log("data:", data.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    }); */
}

function getTotalBalance(apiKey) {
  return fetch("https://api.openai.com/v1/billing", {
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      var totalBalance = 0.0;
      for (var i = 0; i < data.data.length; i++) {
        totalBalance += data.data[i].balance;
      }
      return totalBalance;
    });
}
function formatDate(date) {
  //定义函数，接收一个日期对象作为参数
  const year = date.getFullYear(); //获取年份
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); //获取月份，并将其转换为字符串格式，如果月份只有一位数则在前面补0
  const day = date.getDate().toString().padStart(2, "0"); //获取日期，并将其转换为字符串格式，如果日期只有一位数则在前面补0

  return `${year}-${month}-${day}`; //返回格式化后的字符串
}
