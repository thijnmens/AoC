#include <algorithm>
#include <fstream>
#include <iostream>
#include <vector>
#include <map>
#include <bits/ranges_algo.h>

int main() {
    std::ifstream input("../input.txt");

    // Input types
    std::vector<int> leftList;
    std::vector<int> rightList;
    std::map<int, int> instances;

    // Parse file
    int a, b;
    while (input >> a >> b) {
        leftList.push_back(a);
        rightList.push_back(b);
        if (instances.contains(b)) {
            instances[b]++;
        } else {
            instances.insert(std::pair(b, 1));
        }
    }

    // Sort list
    std::ranges::sort(leftList);
    std::ranges::sort(rightList);

    // Calculate outputs
    int totalDistance = 0;
    int totalSimilarity = 0;
    for (int i = 0; i < leftList.size(); i++) {
        totalDistance += std::abs(leftList[i] - rightList[i]);
        totalSimilarity += std::abs(leftList[i] * instances[leftList[i]]);
    }

    std::cout << "distance:" << totalDistance << std::endl;
    std::cout << "similarity:" << totalSimilarity << std::endl;

    return 0;
}
