#include "readfromfile.h"

int main() {

    char* input = readfromfile("input-01.txt");
    if (input == NULL) {

        printf("Error while reading the file.\n");
        return 1;
    }
    
    char* ptr = input;
    int offset;

    int sum = 0;
    int number;

    for (offset = 1 ; *(input + offset - 1) != '\0' ; offset++) {

        if (*(input + offset) == '\n' || *(input + offset) == '\0') {

            if (sscanf(ptr, "%d", &number) == 1) {

                sum += number;
                ptr = input + offset + 1;
            }
        }
    }

    printf("sum: %d\n", sum);

    free(input);

    return 0;
}
