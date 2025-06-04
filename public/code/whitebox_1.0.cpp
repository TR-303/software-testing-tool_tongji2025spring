#include <iostream>
#include <iomanip>
#include <vector>
#include <string>

using namespace std;

// 佣金计算函数
double calculateCommission(double sales, int leaveDays, double cashRatio, int& commissionFactor) {
    // 条件1: 销售额>200万，请假天数<=10天，现金到账>=60%
    if (sales > 200.0 && leaveDays <= 10 && cashRatio >= 60.0) {
        commissionFactor = 7;
        return sales / 7.0;
    }
    // 条件2: 现金到账<60%
    else if (cashRatio < 60.0) {
        commissionFactor = 0;
        return 0.0;
    }
    // 其他情况
    else {
        // 现金到账<=85%
        if (cashRatio <= 85.0) {
            commissionFactor = 6;
            return sales / 6.0;
        }
        // 现金到账>85%
        else {
            commissionFactor = 5;
            return sales / 5.0;
        }
    }
}

// 测试用例结构体
struct TestCase {
    string name;
    double sales;
    int leaveDays;
    double cashRatio;
    double expectedCommission;
    int expectedFactor;
    string coverage;
};

int main() {
    
    double sales;
    int leaveDays;
    double cashRatio;
        
        // cout << "\n输入销售额(万RMB, 0退出): ";
    cin >> sales;
        
        // cout << "输入请假天数: ";
    cin >> leaveDays;
        
        // cout << "输入现金到账比例(%): ";
    cin >> cashRatio;
        
    int factor;
    double commission = calculateCommission(sales, leaveDays, cashRatio, factor);
        
    cout << fixed << setprecision(2) << commission << endl;
    
    return 0;
}