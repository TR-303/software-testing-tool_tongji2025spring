#include <iostream>
using namespace std;

const int HOST_PRICE = 25;
const int MONITOR_PRICE = 30;
const int PERIPHERAL_PRICE = 45;

int calculate_sales(int host, int monitor, int peripheral) {
    return host * HOST_PRICE + monitor * MONITOR_PRICE + peripheral * PERIPHERAL_PRICE;
}

double calculate_commission(int total_sales) {
    if (total_sales <= 1000) {
        return total_sales * 0.10;
    } else if (total_sales <= 1800) {
        return total_sales * 0.15;
    } else {
        return total_sales * 0.20;
    }
}

bool handle_input(int& host, int& monitor, int& peripheral) {
    cin >> host;
    if (host == -1) return false;

    cin >> monitor >> peripheral;

    if (host < 0 || host > 70 || monitor < 0 || monitor > 80 || peripheral < 0 || peripheral > 90) {
        cout << "销售数量非法！\n";
        exit(0);  // 非法输入立即退出
    }

    if (host == 0 || monitor == 0 || peripheral == 0) {
        cout << "应至少销售一台完整的机器！\n";
        exit(0);  // 不构成完整设备也视为非法
    }

    return true;
}

void computer_sales_system() {
    int host, monitor, peripheral;
    int total_sales = 0;

    while (handle_input(host, monitor, peripheral)) {
        total_sales += calculate_sales(host, monitor, peripheral);
    }

    cout << "销售总额：" << total_sales << " 元，";

    double commission = calculate_commission(total_sales);
    cout << "提成：" << commission << " 元" << endl;
}

int main() {
    computer_sales_system();
    return 0;
}
