// 主要实现函数

// 取随机数整数x (<Min < x < Max)，参数包含范围的最大值Max和最小值Min
function GetRandomNum(Max, Min) {
    var NumRange = Max - Min;
    var a = Math.random();  // 取随机数 0.0-1.0
    // 取范围内的整数
    var x = Min + Math.round( a * NumRange ); // +Min 确保最小值
    return x;
}

// 交换两边式子函数
function exchange (exp) {
    console.log(exp);
    var arr = exp.split(' - ');
    return arr[1] + ' - ' + arr[0];
}

// 取最大公因数
function getMaxFactor(x, y) {
    var t = 0;
    while(y) {
        t = x%y;    //取余
        x = y;
        y = t;
    }
    return x;
}

// 分数化简 （a为分子，b为分母，mf为最大公约数）
function fenShu (a,b,mf) {
    if(a == 0 || b == 0) return 0;
    if(mf==1) {
        // 不需要化简分式
        if(a>b && b!=1) {
            // 分子比较大，则转化为真分式
            return parseInt(a/b) + "`" + a%b + '/' + b;
        } else if(a<b) {
            // 分子小则保留输出
            return a + '/' + b;
        } else {
            // 分子分母相等，则为一
            return 1;
        }
    } else {
        // 需要化简分式
        // 对x,y根据最大公因子进行化简
        var x = a/mf;
        var y = b/mf;

        // 判断分母是否为1
        if(y==1) {
            return x;
        } else {
            return fenShu(x,y, getMaxFactor(x, y));
            // 递归化简 直到最后为最简式子
        }
    }
}

// 最简分数式
function simpleFenshu (num) {
    num = num.toString();
    if (num.indexOf('/') == -1) {
        return num;
    } else {
        var arr = num.split('/');
        arr[0] = Number(arr[0]);
        arr[1] = Number(arr[1]);
        return fenShu(arr[0], arr[1], getMaxFactor(arr[0], arr[1]));
    }
}

// 分数产生器
function createFenshu () {
    // 为了不产生比较难运算的分数，所以随机分子分母设定范围在（1，30）之间
    var son_a = GetRandomNum(1,30); 
    var par_b = GetRandomNum(1,30);
    var son_c = GetRandomNum(1,30); 
    var par_d = GetRandomNum(1,30); 

    // 合并成为分数X/Y
    var X = son_a + "/" + par_b;
    var Y = son_c + "/" + par_d;

    // 取最大公约数
    max_x = getMaxFactor(son_a,par_b);
    max_y = getMaxFactor(son_c,par_d);

    // 取得最终返回的最简分数表示
    var N = fenshu(son_a,par_b,max_x);
    var M = fenshu(son_c,par_d,max_y);

    return N;
}

// 问题生成器
function createProblem () {
    // 定义一个操作符数组
    var Arr = [" + ", " - ", " * ", " ÷ "]; 

    // 随机数来决定操作符
    var n = GetRandomNum(0,3);
    var n1 = GetRandomNum(0,3);
    var n2 = GetRandomNum(0,3);

    // 随机数来决定操作符的数目 <=3
    var m = GetRandomNum(1,3);
    
    switch(m) {
        case 1:{
            var a = [];
            for(var i = 0; i < 2; i++) {
                var f = GetRandomNum(1, 7);
                if(f%4 != 0) {
                    a[i] = GetRandomNum(1, MAX_NUM);
                } else {
                    a[i] = GetRandomNum(1, MAX_NUM) + '/' + GetRandomNum(1,MAX_NUM);
                }
            }
            return a[0] + Arr[n] + a[1];
        }
        case 2:{
            var a = [];
            for(var i = 0; i < 3; i++) {
                var f = GetRandomNum(1, 7);
                if(f%4 != 0) {
                    a[i] = GetRandomNum(1,MAX_NUM);
                } else {
                    a[i] = GetRandomNum(1,MAX_NUM) + '/' + GetRandomNum(1,MAX_NUM);
                }
            }
            var m = GetRandomNum(1, 2);
            if (m == 1) {
                return "( " + a[0] + Arr[n] + a[1] + " )" + Arr[n1] + a[2];
            } else {
                return a[0] + Arr[n] + "( " +  a[1] + Arr[n1] + a[2] + " )";
            }
        }
        case 3:{
            var a = [];
            for(var i = 0; i < 4; i++) {
                var f = GetRandomNum(1, 7);
                if(f%4 != 0) {
                    a[i] = GetRandomNum(1,MAX_NUM);
                } else {
                    a[i] = GetRandomNum(1,MAX_NUM) + '/' + GetRandomNum(1,MAX_NUM);
                }
            }
            var m = GetRandomNum(1, 4);
            if (m == 1) {
                return "( " + a[0] + Arr[n] + a[1] + " )" + Arr[n1] + "( " + a[2] + Arr[n2] + a[3] + " )";
            } else if(m==2){
                return a[0] + Arr[n] + "( " +  a[1] + Arr[n1] + a[2] + " )" + Arr[n2] + a[3];
            } else if(m==3){
                return "( " +  a[0] + Arr[n] + a[1] + " )" + Arr[n1] + a[2] + Arr[n2] + a[3];
            } else {
                return a[0] + Arr[n] + a[1] + Arr[n1] + "( " +  a[2] + Arr[n2] + a[3] + " )";
            }
        }
    }
}


// 计算结果函数
function getResult (fir, sec, cur) {
    // console.log(fir + ',' + sec);
    // console.log(cur);
	if(fir.toString().indexOf('/') == -1 && sec.toString().indexOf('/') == -1) {
		fir = Number(fir);
		sec = Number(sec);
		switch(cur) {
            case '+': return (fir + sec);
            case '-': return (fir - sec);
            case '*': return (fir * sec);
            case '÷': return fir + '/' + sec;
            default: return 1;
	    }
	} else if(fir.toString().indexOf('/') != -1 && sec.toString().indexOf('/') == -1){
		var sonPare = fir.split('/');

        switch(cur) {
            case '+': return ( Number(sonPare[1]) * Number(sec) + Number(sonPare[0]) ) + '/' + Number(sonPare[1]);
            case '-': return ( Number(sonPare[0]) - Number(sonPare[1]) * Number(sec) ) + '/' + Number(sonPare[1]);
            case '*': return ( Number(sonPare[0]) * Number(sec) ) + '/' + Number(sonPare[1]);
            case '÷': return Number(sonPare[0]) + '/' + ( Number(sonPare[1]) * Number(sec) );
            default: return 1;
	    }
        
	} else if(fir.toString().indexOf('/') == -1 && sec.toString().indexOf('/') != -1){
		var sonPare = sec.split('/');
        
        switch(cur) {
            case '+': return Number(sonPare[1]) * Number(fir) + Number(sonPare[0]) + '/' + Number(sonPare[1]);
            case '-': return ( Number(sonPare[1]) * Number(fir) - Number(sonPare[0]) ) + '/' + Number(sonPare[1]);
            case '*': return ( Number(sonPare[0]) * Number(fir) ) + '/' + Number(sonPare[1]);
            case '÷': return ( Number(sonPare[1]) * Number(fir) ) + '/' + Number(sonPare[0]);
            default: return 1;
	    }
	} else if(fir.toString().indexOf('/') != -1 && sec.toString().indexOf('/') != -1){
		var sonPare1 = fir.split('/');
		var sonPare2 = sec.split('/');
        
        switch(cur) {
            case '+': return ( Number(sonPare2[1]) * Number(sonPare1[0]) + Number(sonPare2[0]) * Number(sonPare1[1]) ) + '/' + (Number( sonPare1[1]) * Number(sonPare2[1]) );
            case '-': return ( Number(sonPare1[0]) * Number(sonPare2[1]) - Number(sonPare2[0]) * Number(sonPare1[1]) ) + '/' + (Number( sonPare1[1]) * Number(sonPare2[1]) );
            case '*': return ( Number(sonPare1[0]) * Number(sonPare2[0]) ) + '/' + ( Number(sonPare1[1]) * Number(sonPare2[1]) );
            case '÷': return ( Number(sonPare1[0]) * Number(sonPare2[1]) ) + '/' + ( Number(sonPare1[1]) * Number(sonPare2[0]) );
            default: return 1;
	    }
	}
}

// 调度场算法实现函数
function isOperator(value){
    var operatorString = "+-*÷()";
    return operatorString.indexOf(value) > -1
}
 
function getPrioraty(value){
    switch(value){
        case '+':
        case '-':
            return 1;
        case '*':
        case '÷':
            return 2;
        default:
            return 0;
    }
}
 
function prioraty(o1, o2){
    return getPrioraty(o1) <= getPrioraty(o2);
}
 
function dal2Rpn(exp){
    var inputStack = [];
    var outputStack = [];
    var outputQueue = [];
 
    for(var i = 0, len = exp.length; i < len; i++){
        var cur = exp[i];
		inputStack = exp.split(' ');
    }
	// console.log(inputStack);
	
    // console.log('step one');
    while(inputStack.length > 0){
        var cur = inputStack.shift();
        if(isOperator(cur)){
            if(cur == '('){
                outputStack.push(cur);
            }else if(cur == ')'){
                var po = outputStack.pop();
                while(po != '(' && outputStack.length > 0){
                    outputQueue.push(po);
                    po = outputStack.pop();
                }
                if(po != '('){
                    throw "error: unmatched ()";
                }
            }else{
                while(prioraty(cur, outputStack[outputStack.length - 1]) && outputStack.length > 0){
                    outputQueue.push(outputStack.pop());
                }
                outputStack.push(cur);
            }
        }else{
            outputQueue.push(cur);
        }
    }
    // console.log('step two');
    if(outputStack.length > 0){
        if(outputStack[outputStack.length - 1] == ')' || outputStack[outputStack.length - 1] == '('){
            throw "error: unmatched ()";
        }
        while(outputStack.length > 0){
            outputQueue.push(outputStack.pop());
        }
    }
    // console.log('step three');
    return outputQueue;
 
}

function evalRpn(rpnQueue){
    var outputStack = [];
    while(rpnQueue.length > 0){
        var cur = rpnQueue.shift();
 
        if(!isOperator(cur)){
            outputStack.push(cur);
        }else{
            if(outputStack.length < 2){
                throw "unvalid stack length";
            }
            var sec = outputStack.pop();
            var fir = outputStack.pop();
 
            outputStack.push(getResult(fir, sec, cur));
        }
    }
 
    if(outputStack.length != 1){
        throw "unvalid expression";
    }else{
        return outputStack[0];
    }
}
     