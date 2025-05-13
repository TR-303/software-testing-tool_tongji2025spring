#include <iostream>
using namespace std;

void determineTriangleType(int a, int b, int c) {
    if (a + b > c && a + c > b && b + c > a) {
        if (a == b && b == c) {
            cout << "等边三角形" << endl;
        } else if (a == b || b == c || a == c) {
            cout << "等腰三角形" << endl;
        } else {
            cout << "普通三角形" << endl;
        }
    } else {
        cout << "不是三角形" << endl;
    }
}

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    determineTriangleType(a, b, c);
    return 0;
}
