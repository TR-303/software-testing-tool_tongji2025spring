#include <iostream>
#include <iomanip>
#include <vector>
#include <string>
#include <cmath>  // 加入用于判断小数

using namespace std;

// 佣金计算函数
double calculateCommission(double sales, int leaveDays, double cashRatio, int& commissionFactor) {
    if (sales > 200.0 && leaveDays <= 10 && cashRatio >= 60.0) {
        commissionFactor = 7;
        return sales / 7.0;
    } else if (sales > 200.0 && leaveDays <= 10 && cashRatio < 60.0) {
        commissionFactor = 0;
        return 0.0;
    } else {
        if (cashRatio <= 85.0) {
            commissionFactor = 6;
            return sales / 6.0;
        } else {
            commissionFactor = 5;
            return sales / 5.0;
        }
    }
}

int main() {
    double sales;
    int leaveDays;
    double cashRatio;

    cin >> sales >> leaveDays >> cashRatio;

    int factor;
    double commission = calculateCommission(sales, leaveDays, cashRatio, factor);

    // 判断是否为整数（误差范围内）
    if (fabs(commission - static_cast<int>(commission)) < 1e-6) {
        cout << static_cast<int>(commission) << endl;
    } else {
        cout << fixed << setprecision(3) << commission << endl;
    }

    return 0;
}
