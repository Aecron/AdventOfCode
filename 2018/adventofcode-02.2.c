#include <string.h>
#include "readfromfile.h"

int diffChars(const char* str1, const char* str2) {

    size_t i;
    int count;
    for (i = 0, count = 0 ; str1[i] != '\0' && str2[i] != '\0' ; i++)
        if (str1[i] != str2[i])
            count++;

    return count;
}

int main() {

    char* input = readfromfile("input-02.txt");
    if (input == NULL) {

        printf("Error while reading the file.\n");
        return 1;
    }

    size_t i, j;

    char baseString[27], compareString[27];

    for (i = 0 ; i < strlen(input) - 2 ; i += 28) {

        sscanf(input + i, "%s\n", baseString);

        for (j = i + 28 ; j < strlen(input) ; j += 28) {

            if (sscanf(input + j, "%s", compareString) == 1) {

                if (diffChars(baseString, compareString) == 1)
                    printf("Found the 2 strings:\n\t%s\n\t%s\n", baseString, compareString);
            }
        }
    }

    free(input);

    return 0;
}
