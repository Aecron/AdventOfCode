#include "readfromfile.h"

int main() {

    char* input = readfromfile("input-02.txt");
    if (input == NULL) {

        printf("Error while reading the file.\n");
        return 1;
    }
    
    size_t i, j, k;

    int sum2 = 0, sum3 = 0;
    int current, count;

    for (i = 0, j = 0, current = 0 ; input[i] != '\0' ; i++) {

        if (input[i] == '\n') {

            j = i + 1;
            sum2 += current & 0b01;
            sum3 += (current & 0b10) >> 1;

            current &= 0;
        }

        else {

            for (k = 0, count = 0 ; input[j + k] != '\n' && input[j + k] != '\0' ; k++) {

                if (input[j + k] == input[i])
                    count++;
            }

            if (count == 2)
                current |= 0b01;

            if (count == 3)
                current |= 0b10;
        }
    }

    printf("Checksum: %d\n", sum2 * sum3);

    free(input);

    return 0;
}
