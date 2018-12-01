#include "readfromfile.h"
#include "array_d.h"

int main() {

    char* input = readfromfile("input-01.txt");
    if (input == NULL) {

        printf("Error while reading the file.\n");
        return 1;
    }

    char* ptr;
    int offset;

    int number;

    Array frequencies;
    initArray(&frequencies);
    insertArray(&frequencies, 0);


    int found = 0;

    while(!found) {

        for (ptr = input, offset = 1 ; *(input + offset - 1) != '\0' && !found ; offset++) {

            if (*(input + offset) == '\n' || *(input + offset) == '\0') {

                if (sscanf(ptr, "%d", &number) == 1) {

                    found = inArray(&frequencies, frequencies.data[frequencies.size - 1] + number);
                    insertArray(&frequencies, frequencies.data[frequencies.size - 1] + number);
                    ptr = input + offset + 1;
                }
            }
        }

    }

    printf("First duplicate: %d\n", frequencies.data[frequencies.size - 1]);

    freeArray(&frequencies);
    free(input);

    return 0;
}
