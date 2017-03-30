#include <stdio.h>

int main() {
int a = 3;

for (int i=0; i < 8; i++) {
   printf("%d\n", a & 1? 1:0);
   a  >>=1;
}

return 0;
}

