#include <iostream>

using namespace std;

int main(){
    int y,m,d;
    cin>>y>>m>>d;

    // 闰年判断: 错误注入！400年闰年会被忽视
    bool isLeapYear = (y % 4 == 0 && y % 100 != 0);
    const int monthDays[12] = {31, 28+int(isLeapYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

    // 业务规定的时间范围
    if(y<1900||y>2100){
        cout<<"年份不合法"<<endl;
        return 0;
    }
    // 检查日期合法性
    if(m<1||m>12){
        cout<<"月份不合法"<<endl;
        return 0;
    }
    if(d<1 || d>monthDays[m-1]){
        cout<<"日期不合法"<<endl;
        return 0;
    }

    if(d==monthDays[m-1]){
        d=1;
        if(m==12){
            m=1;
            ++y;
        }else ++m;
    }else ++d;

    cout<<y<<"年"<<m<<"月"<<d<<"日"<<endl;
    return 0;
}