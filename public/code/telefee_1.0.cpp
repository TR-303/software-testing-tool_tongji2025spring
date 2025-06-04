#include <iostream>
#include <iomanip>

using namespace std;

int main() {
    // 基本月租费和每分钟通话费
    const double BASE_FEE = 25.0;
    const double RATE_PER_MINUTE = 0.15;

    // 输入当月通话分钟数和本年度未按时缴费次数
    double minutes;
    int lateCount;
    cin >> minutes;
    cin >> lateCount;

    // 确定对应的折扣率（以百分比形式）和最大容许未按时缴费次数
    double discountRate = 0.0; // 折扣率，若无折扣则为0
    int allowedLate = 0;       // 当前时间段对应的最大容许未按时缴费次数

    if (minutes > 0 && minutes <= 60) {
        allowedLate = 1;
        discountRate = 1.0;    // 1.0%
    } else if (minutes > 60 && minutes <= 120) {
        allowedLate = 2;
        discountRate = 1.5;    // 1.5%
    } else if (minutes > 120 && minutes <= 180) {
        allowedLate = 3;
        discountRate = 2.0;    // 2.0%
    } else if (minutes > 180 && minutes <= 300) {
        allowedLate = 3;
        discountRate = 2.5;    // 2.5%
    } else if (minutes > 300) {
        allowedLate = 6;
        discountRate = 3.0;    // 3.0%
    } else {
        // 若分钟数为0或负数，则不享受折扣，实际通话费为0
        allowedLate = 0;
        discountRate = 0.0;
    }

    // 判断是否超过容许的未按时缴费次数，若超过则取消折扣
    if (lateCount > allowedLate) {
        discountRate = 0.0;
    }

    // 计算实际通话费、不打折时通话费
    double actualCallFee = minutes * RATE_PER_MINUTE;

    // 按折扣率计算折扣后通话费
    double discountedCallFee = actualCallFee * (1.0 - discountRate / 100.0);

    // 计算当月总费用
    double totalFee = BASE_FEE + discountedCallFee;

    cout << totalFee;
    return 0;
}
