const BASE_URL = 'https://nlp-demo.szmckj.cn';
const wzyc = 'https://wzyc-demo.szmckj.cn'


const id = null;
const idA = null;
const tts_message = null;
const if_kb = false
const chat_id = null
const user_id = 'nlp-demo.szmckj.cn'
const md = null

// 获取随机题目接口
function fetchRandomQuestion() {
    axios.get(`${BASE_URL}/api/randomquestion`)
        .then(function (response) {
            document.getElementById('question').innerText = response.data.q_stem;
            const options = response.data.options;
            this.id = response.data.id;
            const splitData = options.split('|');

            if (splitData.length === 2 && splitData.includes("正确") && splitData.includes("错误")) {
                // 如果选项是“正确|错误”格式
                document.getElementById("optionA").textContent = `A、正确`;
                document.getElementById("optionB").textContent = `B、错误`;
            } else {
                // 创建一个对象来存储切分后的数据
                const alloptions = {};
                // 遍历切分后的数据
                splitData.forEach(item => {
                    const [key, value] = item.split("、"); // 根据冒号切分键值对
                    alloptions[key] = value; // 将数据存储到对象中
                });
                // 将数据填入相应的选项
                document.getElementById("optionA").textContent = `A、${alloptions["A"] || "无数据"}`;
                document.getElementById("optionB").textContent = `B、${alloptions["B"] || "无数据"}`;
                document.getElementById("optionC").textContent = `C、${alloptions["C"] || "无数据"}`;
                document.getElementById("optionD").textContent = `D、${alloptions["D"] || "无数据"}`;
            }
        }).catch(function (err) {
            console.log(err)
        });
}

// 获取随机题目接口2
function fetchRandomQuestionA() {
    axios.get(`${BASE_URL}/api/randomquestion`)
        .then(function (response) {
            document.getElementById('questionA').innerText = response.data.q_stem;
            const options = response.data.options;
            this.idA = response.data.id;
            const splitData = options.split('|');

            if (splitData.length === 2 && splitData.includes("正确") && splitData.includes("错误")) {
                // 如果选项是“正确|错误”格式
                document.getElementById("optiona").textContent = `A、正确`;
                document.getElementById("optionb").textContent = `B、错误`;
            } else {
                // 创建一个对象来存储切分后的数据
                const alloptions = {};
                // 遍历切分后的数据
                splitData.forEach(item => {
                    const [key, value] = item.split("、"); // 根据冒号切分键值对
                    alloptions[key] = value; // 将数据存储到对象中
                });
                // 将数据填入相应的选项
                document.getElementById("optiona").textContent = `A、${alloptions["A"] || "无数据"}`;
                document.getElementById("optionb").textContent = `B、${alloptions["B"] || "无数据"}`;
                document.getElementById("optionc").textContent = `C、${alloptions["C"] || "无数据"}`;
                document.getElementById("optiond").textContent = `D、${alloptions["D"] || "无数据"}`;
            }
        }).catch(function (err) {
            console.log(err)
        });
}


// 获取相似题目的函数
function fetchWrongQuestions() {
    document.getElementById('question-display').style.display = 'block';
    document.getElementById('text-display').style.display = 'none';
    document.getElementById('analysis-container').style.display = 'none';
    const questionDisplay = document.getElementById('question-display');
    axios.get(`${wzyc}/api/question/${this.id}/similar`)
        .then(function (response) {
            console.log(response.data);
            // 清空问题容器
            questionDisplay.innerHTML = '';
            // 遍历返回的数据并渲染到页面
            response.data.forEach(item => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'question-container';
                // 添加问题文本
                const questionText = document.createElement('div');
                questionText.className = 'question';
                questionText.textContent = item.question;
                questionDiv.appendChild(questionText);

                // 添加选项（如果有）
                if (item.options) {
                    const optionsDiv = document.createElement('div');
                    optionsDiv.className = 'options';
                    optionsDiv.style.display = 'block'; // 初始隐藏选项
                    const options = item.options.split('|');
                    options.forEach(option => {
                        const optionText = document.createElement('div');
                        optionText.textContent = option;
                        optionsDiv.appendChild(optionText);
                    });
                    questionDiv.appendChild(optionsDiv);

                    // 添加点击事件，点击题目时切换选项的显示状态
                    // questionText.addEventListener('click', function () {
                    //     if (optionsDiv.style.display === 'none') {
                    //         optionsDiv.style.display = 'block';
                    //     } else {
                    //         optionsDiv.style.display = 'none';
                    //     }
                    // });
                }

                // 将问题添加到页面
                questionDisplay.appendChild(questionDiv);
            });
        })
        .catch(function (err) {
            console.log(err);
            // 如果请求失败，显示错误信息
            questionDisplay.innerHTML = '<div class="error">加载失败，请稍后重试。</div>';
        });
}

// 实现按钮被点击后保持黑色
// 获取所有具有 'btn-primary' 类的按钮
document.querySelectorAll('.btn-primary').forEach(button => {
    // 为每个按钮添加点击事件监听器
    button.addEventListener('click', function () {
        // 切换当前按钮的 'clicked' 类
        this.classList.toggle('clicked');
    });
});


// 获取法条推荐的函数
function fetchTextContent() {
    document.getElementById('question-display').style.display = 'none';
    document.getElementById('text-display').style.display = 'block';
    document.getElementById('analysis-container').style.display = 'none';
    const textDisplay = document.getElementById('text-display');
    // 发送Axios请求获取法条分析内容
    axios.get(`${BASE_URL}/api/lows?questionid=${this.id}`)
        .then(function (response) {
            // console.log(response.data)

            // 清空法条容器
            textDisplay.innerHTML = '';
            // 遍历返回的数据并渲染到页面
            response.data.forEach(item => {
                const textDiv = document.createElement('div');
                textDiv.className = 'text-container';
                // 添加法条文本
                const textText = document.createElement('div');
                textText.className = 'text';
                textText.innerHTML = item.law_name + '<br>' + item.chapter + '<br>' + item.article_content;
                textDiv.appendChild(textText);

                // 将法条添加到页面
                textDisplay.appendChild(textDiv);
                // console.log(12)
            });
        }).catch(function (err) {
            console.log(err)
        });
}


// 获取法理分析的函数
function fetchLegalAnalysis() {
    document.getElementById('question-display').style.display = 'none';
    document.getElementById('text-display').style.display = 'none';
    document.getElementById('analysis-container').style.display = 'block';
    // 发送Axios请求获取法理分析内容
    if (this.id != null) {
        axios.get(`${BASE_URL}/api/analysis?questionid=${this.id}`)
            .then(function (response) {
                const analysisData = JSON.parse(response.data.analysis);
                const analysisText = analysisData.Analysis;
                displayTypingEffect(analysisText);
            }).catch(function (err) {
                console.log(err);
            });

    }
}

// 打字机效果函数
function displayTypingEffect(text) {
    const analysisContainer = document.getElementById('analysis-container');
    analysisContainer.innerHTML = ''; // 清空容器内容
    let index = 0;

    function type() {
        if (index < text.length) {
            analysisContainer.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 10); // 设置打字速度
        }
    }

    type();
}

// 语音助手的开始页面初始化的三条信息
function selectMessage(message) {
    document.getElementById('chat-input').innerHTML = message;
}

// 获取chat_id的接口
function getChatId() {
    axios.get(`${BASE_URL}/api/chatid?user_id=nlp-demo.szmckj.cn`)
        .then(function (response) {
            // console.log(response.data)
            this.chat_id = response.data.chat_id
        }).catch(function (err) {
            console.log(err)
        });
}


// // 检测是否为 Markdown 语法
// function isMarkdown(text) {
//     // 检测常见的 Markdown 语法
//     const markdownPatterns = [
//         /^#+\s/, // 标题
//         /\*\*.*\*\*/, // 加粗
//         /\*.*\*/, // 斜体
//         /\[.*\]\(.*\)/, // 链接
//         /^- /, // 无序列表
//         /^\d+\. /, // 有序列表
//         /`{1,3}.*`{1,3}/, // 代码
//         /!\[.*\]\(.*\)/, // 图片
//         />\s/, // 引用
//     ];

//     // 如果匹配到任意一个 Markdown 语法，返回 true
//     return markdownPatterns.some(pattern => pattern.test(text));
// }

// 学习对话接口
async function sendMessage() {
    const input = document.getElementById('chat-input');
    const messageText = input.innerHTML;
    // const rendermessage = this.md.render(messageText);
    console.log(messageText)
    if (messageText) {
        // 添加用户消息
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.innerHTML = `
            <div class="message-content">
                <div class="message-text">${messageText}</div>
            </div>
            <img src="images/user.png" alt="User Avatar" class="avatar">
        `;
        document.getElementById('chat-messages').appendChild(userMessage);
        // 清空输入框
        input.innerHTML = '';
        try {
            // 发送POST请求
            const response = await fetch(`${BASE_URL}/api/chat/train`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_input: messageText, if_kb: this.if_kb, question_id: this.idA, chat_id: this.chat_id })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedMessage = ''; // 用于存储累积的消息
            // 创建机器人消息容器
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            const uniqueId = `audio-${Date.now()}`;
            botMessage.innerHTML = `
                <img src="images/robot.png" alt="Bot Avatar" class="avatar">
                <div class="message-content">
                    <div class="message-text">${accumulatedMessage}</div>
                    <i class="fa-regular fa-circle-play" id="play_${uniqueId}" style="display:none;" onclick="bf_vedio('${uniqueId}', '${accumulatedMessage}')"></i>
                    <i class="fa-regular fa-circle-pause" style="display:none" id="pause_${uniqueId}" onclick="zt_vedio('${uniqueId}')"></i>
                    <audio id="${uniqueId}" style="display:none"></audio>
                </div>
            `;
            document.getElementById('chat-messages').appendChild(botMessage);
            // 获取消息文本容器
            const messageTextContainer = botMessage.querySelector('.message-text');
            const playButton = botMessage.querySelector(`#play_${uniqueId}`);
            const pauseButton = botMessage.querySelector(`#pause_${uniqueId}`);
            async function read() {
                const { done, value } = await reader.read();
                if (done) {
                    // 显示播放按钮
                    playButton.style.display = 'block';
                    return;
                }
                const responseText = decoder.decode(value);
                // 解析SSE格式的数据
                const lines = responseText.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (line.startsWith('event: Update')) {
                        // 找到对应的data行
                        const dataLine = lines[i + 1]?.trim();
                        if (dataLine && dataLine.startsWith('data: ')) {
                            const data = dataLine.slice(5).trim();
                            if (data) {
                                // 累积AI消息
                                accumulatedMessage += data;
                                // 使用 marked.js 将 Markdown 转换为 HTML
                                const htmlContent = this.md.render(accumulatedMessage);
                                // 更新机器人消息内容
                                // setTimeout(() => {
                                messageTextContainer.innerHTML = htmlContent;
                                playButton.setAttribute('onclick', `bf_vedio('${uniqueId}', '${accumulatedMessage}')`);
                                // }, 200);
                                // 滚动到底部
                                const chatMessages = document.getElementById('chat-messages');
                                chatMessages.scrollTop = chatMessages.scrollHeight;
                            }
                        }
                    }
                }
                await read();
            }
            await read();
        } catch (error) {
            console.error('Fetch failed:', error);
        }
    }
}


// 学习对话接口 ----- demo
// async function sendMessagedemo() {
//     const input = document.getElementById('chat-input');
//     const messageText = input.innerHTML;
//     if (messageText) {
//         // 添加用户消息
//         const userMessage = document.createElement('div');
//         userMessage.className = 'message user-message';
//         userMessage.innerHTML = `
//             <div class="message-content">
//                 <div class="message-text">${messageText}</div>
//             </div>
//             <img src="images/user.png" alt="User Avatar" class="avatar">
//         `;
//         document.getElementById('chat-messages').appendChild(userMessage);
//         // 清空输入框
//         input.innerHTML = '';
//         try {
//             // 发送POST请求
//             const response = await fetch(`${BASE_URL}/api/chat/analysis`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ user_input: messageText, database_id: "", chat_id: this.chat_id })
//             });
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const reader = response.body.getReader();
//             const decoder = new TextDecoder();
//             let accumulatedMessage = ''; // 用于存储累积的消息内容
//             // 创建机器人消息容器
//             const botMessage = document.createElement('div');
//             botMessage.className = 'message bot-message';
//             const uniqueId = `audio-${Date.now()}`;
//             botMessage.innerHTML = `
//                 <img src="images/robot.png" alt="Bot Avatar" class="avatar">
//                 <div class="message-content">
//                     <div class="message-text">
//                         <div class="loading-indicator">正在生成...</div> <!-- 添加“生成中”效果 -->
//                     </div>
//                     <i class="fa-regular fa-circle-play" id="play_${uniqueId}" style="display:none;" onclick="bf_vedio('${uniqueId}', '${accumulatedMessage}')"></i>
//                     <i class="fa-regular fa-circle-pause" style="display:none" id="pause_${uniqueId}" onclick="zt_vedio('${uniqueId}')"></i>
//                     <audio id="${uniqueId}" style="display:none"></audio>
//                 </div>
//             `;
//             document.getElementById('chat-messages').appendChild(botMessage);
//             // 获取消息文本容器
//             const messageTextContainer = botMessage.querySelector('.message-text');
//             const playButton = botMessage.querySelector(`#play_${uniqueId}`);
//             const pauseButton = botMessage.querySelector(`#pause_${uniqueId}`);
//             // 用于存储当前事件的容器
//             let currentStepContainer = null;
//             let currentUpdateContainer = null;
//             let markdownBuffer = ''; // 用于存储需要渲染 Markdown 的内容
//             let isMarkdownStepActive = false; // 标记当前是否在处理需要渲染 Markdown 的步骤
//             // 初始化 Markdown 渲染器
//             const md = window.markdownit(); // 确保页面中引入了 markdown-it 库
//             async function read() {
//                 const { done, value } = await reader.read();
//                 if (done) {
//                     // 数据全部接收完毕，统一替换为 Markdown 渲染结果
//                     if (isMarkdownStepActive) {
//                         currentUpdateContainer.innerHTML = md.render(markdownBuffer); // 渲染 Markdown
//                         isMarkdownStepActive = false; // 重置标记
//                     }
//                     playButton.style.display = 'block'; // 显示播放按钮
//                     return;
//                 }
//                 const responseText = decoder.decode(value);
//                 // 解析 SSE 格式的数据
//                 const lines = responseText.split('\n');
//                 console.log('Received response:', lines);
//                 for (let i = 0; i < lines.length; i++) {
//                     const line = lines[i].trim();
//                     if (line.startsWith('event:')) {
//                         const eventName = line.split(':')[1].trim();
//                         if (eventName.startsWith('step')) {
//                             // 处理 step 事件
//                             currentStepContainer = document.createElement('div');
//                             currentStepContainer.className = 'step-container';
//                             messageTextContainer.appendChild(currentStepContainer);
//                             const stepTitle = document.createElement('div');
//                             stepTitle.className = 'step-title';
//                             stepTitle.innerHTML = `<strong>${eventName}:</strong>`; // 显示 step 这几个字
//                             currentStepContainer.appendChild(stepTitle);
//                             // 清空 update 容器
//                             currentUpdateContainer = null;
//                             // 如果是 step3 或 step8，标记为 active
//                             if (eventName === 'step3' || eventName === 'step8') {
//                                 isMarkdownStepActive = true;
//                                 markdownBuffer = ''; // 清空缓存
//                             } else {
//                                 isMarkdownStepActive = false;
//                             }
//                         } else if (eventName === 'Update' || eventName === 'update') {
//                             // 处理 update 事件
//                             if (!currentUpdateContainer) {
//                                 currentUpdateContainer = document.createElement('div');
//                                 currentUpdateContainer.className = 'update-container';
//                                 messageTextContainer.appendChild(currentUpdateContainer);
//                                 // 移除“生成中”效果
//                                 const loadingIndicator = messageTextContainer.querySelector('.loading-indicator');
//                                 if (loadingIndicator) {
//                                     loadingIndicator.remove();
//                                 }
//                             }
//                         } else if (eventName === 'Done') {
//                             // 如果是需要渲染 Markdown 的步骤的 Done 事件，统一渲染 Markdown
//                             if (isMarkdownStepActive) {
//                                 currentUpdateContainer.innerHTML = md.render(markdownBuffer); // 渲染 Markdown
//                                 isMarkdownStepActive = false; // 重置标记
//                             }
//                             // 忽略 Done 事件，并跳过后续的 data 行
//                             while (i + 1 < lines.length && lines[i + 1].trim().startsWith('data:')) {
//                                 i++; // 跳过 data 行
//                             }
//                             continue;
//                         }
//                     } else if (line.startsWith('data:')) {
//                         const data = line.split(':')[1].trim();
//                         if (currentStepContainer && !currentUpdateContainer) {
//                             // 将数据追加到 step 容器
//                             const stepTitle = currentStepContainer.querySelector('.step-title');
//                             stepTitle.innerHTML += ` ${data}`;
//                         } else if (currentUpdateContainer) {
//                             if (isMarkdownStepActive) {
//                                 // 如果是需要渲染 Markdown 的步骤，将数据追加到缓存并立即渲染
//                                 markdownBuffer += data;
//                                 currentUpdateContainer.innerHTML = md.render(markdownBuffer); // 实时渲染 Markdown
//                             } else {
//                                 // 其他步骤直接渲染
//                                 currentUpdateContainer.innerHTML += data;
//                             }
//                             accumulatedMessage += data; // 更新 accumulatedMessage
//                         }
//                     }
//                 }
//                 // 滚动到底部
//                 const chatMessages = document.getElementById('chat-messages');
//                 chatMessages.scrollTop = chatMessages.scrollHeight;
//                 await read();
//             }
//             await read();
//         } catch (error) {
//             console.error('Fetch failed:', error);
//         }
//     }
// }

async function sendMessagedemo() {
    const input = document.getElementById('chat-input');
    const messageText = input.innerHTML;
    if (messageText) {
      // 添加用户消息
      const userMessage = document.createElement('div');
      userMessage.className = 'message user-message';
      userMessage.innerHTML = `
        <div class="message-content">
          <div class="message-text">${messageText}</div>
        </div>
        <img src="images/user.png" alt="User Avatar" class="avatar">
      `;
      document.getElementById('chat-messages').appendChild(userMessage);
      // 清空输入框
      input.innerHTML = '';
      try {
        // 发送POST请求
        const response = await fetch(`${BASE_URL}/api/chat/analysis`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_input: messageText, database_id: "", chat_id: this.chat_id })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedMessage = ''; // 用于存储累积的消息内容
        // 创建机器人消息容器
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        const uniqueId = `audio-${Date.now()}`;
        botMessage.innerHTML = `
          <img src="images/robot.png" alt="Bot Avatar" class="avatar">
          <div class="message-content">
            <div class="message-text">
              <div class="loading-indicator">正在生成...</div> <!-- 添加“生成中”效果 -->
            </div>
            <i class="fa-regular fa-circle-play" id="play_${uniqueId}" style="display:none;" onclick="bf_vedio('${uniqueId}', '${accumulatedMessage}')"></i>
            <i class="fa-regular fa-circle-pause" style="display:none" id="pause_${uniqueId}" onclick="zt_vedio('${uniqueId}')"></i>
            <audio id="${uniqueId}" style="display:none"></audio>
          </div>
        `;
        document.getElementById('chat-messages').appendChild(botMessage);
        // 获取消息文本容器
        const messageTextContainer = botMessage.querySelector('.message-text');
        const playButton = botMessage.querySelector(`#play_${uniqueId}`);
        const pauseButton = botMessage.querySelector(`#pause_${uniqueId}`);
        // 用于存储当前事件的容器
        let currentStepContainer = null;
        let currentUpdateContainer = null;
        let markdownBuffer = ''; // 用于存储需要渲染 Markdown 的内容
        let isMarkdownStepActive = false; // 标记当前是否在处理需要渲染 Markdown 的步骤
        // 初始化 Markdown 渲染器
        const md = window.markdownit({
          breaks: true, // 启用换行渲染
        }); // 确保页面中引入了 markdown-it 库
        async function read() {
          const { done, value } = await reader.read();
          if (done) {
            // 数据全部接收完毕，统一替换为 Markdown 渲染结果
            if (isMarkdownStepActive) {
              currentUpdateContainer.innerHTML = md.render(markdownBuffer); // 渲染 Markdown
              isMarkdownStepActive = false; // 重置标记
            }
            playButton.style.display = 'block'; // 显示播放按钮
            return;
          }
          const responseText = decoder.decode(value);
          // 解析 SSE 格式的数据
          const lines = responseText.split('\n');
          console.log('Received response:', lines);
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('event:')) {
              const eventName = line.split(':')[1].trim();
              if (eventName.startsWith('step')) {
                // 处理 step 事件
                currentStepContainer = document.createElement('div');
                currentStepContainer.className = 'step-container';
                messageTextContainer.appendChild(currentStepContainer);
                const stepTitle = document.createElement('div');
                stepTitle.className = 'step-title';
                stepTitle.innerHTML = `<strong>${eventName}:</strong>`; // 显示 step 这几个字
                currentStepContainer.appendChild(stepTitle);
                // 清空 update 容器
                currentUpdateContainer = null;
                // 如果是 step3 或 step8，标记为 active
                if (eventName === 'step8') {
                  isMarkdownStepActive = true; // 启用 Markdown 渲染
                  markdownBuffer = ''; // 清空缓存
                } else if (eventName === 'step3') {
                  isMarkdownStepActive = true; // 启用 Markdown 渲染
                  markdownBuffer = ''; // 清空缓存
                }
              } else if (eventName === 'Update' || eventName === 'update') {
                // 处理 update 事件
                if (!currentUpdateContainer) {
                  currentUpdateContainer = document.createElement('div');
                  currentUpdateContainer.className = 'update-container';
                  messageTextContainer.appendChild(currentUpdateContainer);
                  // 移除“生成中”效果
                  const loadingIndicator = messageTextContainer.querySelector('.loading-indicator');
                  if (loadingIndicator) {
                    loadingIndicator.remove();
                  }
                }
              } else if (eventName === 'Done') {
                // 如果是需要渲染 Markdown 的步骤的 Done 事件，统一渲染 Markdown
                if (isMarkdownStepActive) {
                  currentUpdateContainer.innerHTML = md.render(markdownBuffer); // 渲染 Markdown
                  isMarkdownStepActive = false; // 重置标记
                }
                // 忽略 Done 事件，并跳过后续的 data 行
                while (i + 1 < lines.length && lines[i + 1].trim().startsWith('data:')) {
                  i++; // 跳过 data 行
                }
                continue;
              }
            } else if (line.startsWith('data:')) {
              const data = line.split(':')[1].trim();
              if (currentStepContainer && !currentUpdateContainer) {
                // 将数据追加到 step 容器
                const stepTitle = currentStepContainer.querySelector('.step-title');
                stepTitle.innerHTML += ` ${data}`;
              } else if (currentUpdateContainer) {
                if (isMarkdownStepActive) {
                  // 如果是需要渲染 Markdown 的步骤，将数据追加到缓存并立即渲染
                  markdownBuffer += data;
                  console.log('Markdown buffer:', markdownBuffer);
                  currentUpdateContainer.innerHTML = md.render(markdownBuffer); // 实时渲染 Markdown
                } else {
                  // 其他步骤直接渲染，保留原始 \n 符号
                  currentUpdateContainer.innerHTML += data; // 保留原始 \n 符号
                }
                accumulatedMessage += data; // 更新 accumulatedMessage
              }
            }
          }
          // 滚动到底部
          const chatMessages = document.getElementById('chat-messages');
          chatMessages.scrollTop = chatMessages.scrollHeight;
          await read();
        }
        await read();
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    }
  }

// 是否开启知识库搜素
function handleCheckboxChange(checkbox) {
    if (checkbox.checked) {
        this.if_kb = true;
    } else {
        this.if_kb = false;
    }
}

// 播放语音
function bf_vedio(audioId, text) {
    const playButton = document.getElementById(`play_${audioId}`);
    const pauseButton = document.getElementById(`pause_${audioId}`);
    const audioElement = document.getElementById(audioId);

    // 检查是否有音频在播放，如果有则先暂停
    if (!audioElement.paused) {
        audioElement.pause();
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
        return;
    }

    // 如果音频已经加载过，且当前处于暂停状态，则从暂停位置继续播放
    if (audioElement.src && audioElement.paused) {
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
        audioElement.play();
        return;
    }

    // 如果音频未加载过，则请求新的音频数据
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';

    axios.post(`${BASE_URL}/api/tts`, { tts_text: text }, { responseType: 'blob' })
        .then(function (response) {
            const blob = new Blob([response.data], { type: 'audio/mpeg' }); // 确保类型正确
            const url = URL.createObjectURL(blob);
            audioElement.src = url;

            // 监听音频播放结束事件
            audioElement.onended = function () {
                playButton.style.display = 'block';
                pauseButton.style.display = 'none';
            };

            // 播放音频
            audioElement.play();
        })
        .catch(function (err) {
            console.log(err);
        });
}

// 暂停语音
function zt_vedio(audioId) {
    const playButton = document.getElementById(`play_${audioId}`);
    const pauseButton = document.getElementById(`pause_${audioId}`);
    const audioElement = document.getElementById(audioId);

    if (audioElement && !audioElement.paused) {
        audioElement.pause();
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
    }
}

// 随机生成示例
const tech_ai_texts = [
    "人工智能的快速发展正在改变我们的生活方式。",
    "大数据与机器学习为精准医疗提供了新的可能性。",
    "自动驾驶技术正在不断提升出行的安全性和便利性。",
    "云计算让企业能够更加高效地管理和存储数据。",
    "量子计算有望解决传统计算机无法处理的复杂问题。"
]
const weather_daily_texts = [
    "今天的天气晴朗，非常适合外出运动和休闲活动。",
    "未来几天可能有小雨，请记得随身携带雨具。",
    "寒冷的冬季里，及时添加衣物以免着凉。",
    "春天的清晨常伴有微风，带来一丝凉意。",
    "夏日的午后，骄阳似火，需要做好防晒措施。"
]

function displayRandomTexts() {
    // 随机选择tech_ai_texts中的一条文本
    const randomTechText = tech_ai_texts[Math.floor(Math.random() * tech_ai_texts.length)];
    console.log(randomTechText)

    // 随机选择weather_daily_texts中的一条文本
    const randomWeatherText = weather_daily_texts[Math.floor(Math.random() * weather_daily_texts.length)];
    console.log(randomWeatherText)

    // 将随机选择的文本显示在id为AI_text和user_text的元素中
    document.getElementById('AI_text').textContent = randomTechText;
    document.getElementById('user_text').textContent = randomWeatherText;
}

let activeButton = null; // 用于记录当前激活的按钮

function handleButtonClick(button) {
    // 如果已经有激活的按钮，移除其激活样式
    if (activeButton) {
        activeButton.classList.remove('active');
    }

    // 为当前点击的按钮添加激活样式
    button.classList.add('active');
    activeButton = button; // 更新当前激活的按钮

    // 根据按钮的 ID 执行不同的操作
    if (button.id === 'show-questions') {
        fetchWrongQuestions();
    } else if (button.id === 'show-text') {
        fetchTextContent();
    } else if (button.id === 'show-analysis') {
        fetchLegalAnalysis();
    }
}


// 需要初始化的api
window.onload = function () {
    this.md = new markdownit()
    document.getElementById('chat-messages').innerHTML = this.md.render(`根据根据查询结果，梧州市烟草专卖局的部分人员名单如下：\n\n- 测试，手机号：13530838018\n- 袁培，手机号：13977410718，邮箱：00000001029@farhr.com\n- 黄永明，手机号：13877498515，邮箱：00000001028@farhr.com`);
    // console.log("onload",this.md.render(`根据查询结果，梧州市烟草专卖局的部分人员名单如下：-测试，手机号：13530838018-袁培，手机号：13977410718，邮箱：00000001029@farhr.com-黄永明，手机号：13877498515，邮箱：00000001028@farhr.com`))
    // console.log("onload", this.md)
    getChatId()
    fetchRandomQuestion();
    fetchRandomQuestionA();

    const defaultButton = document.getElementById('show-analysis');
    handleButtonClick(defaultButton); // 默认选中“法理分析”按钮
    setTimeout(() => {
        fetchLegalAnalysis();
    }, 1000);
    // fetchLegalAnalysis(); // 执行“法理分析”对应的逻辑


    displayRandomTexts();
}