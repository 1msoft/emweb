const data = [];

const rules = ['regex', 'exact'];
const status = ['close', 'runing', 'online', 'error'];
for (let i = 0; i < 100; i++ ) {
  data.push({
    id: i,
    rule: rules[Math.floor(Math.random() * 2)],
    description: '这里是一段描述',
    invokeNum: i * Math.floor(Math.random() * 10),
    status: status[Math.floor(Math.random() * 4)],
    lastInvokeTime: '2019-07-05',
  });
}

export default data;
