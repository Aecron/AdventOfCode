#include <stdio.h>

int main() {

    FILE* file;
    char* line = NULL;

    ssize_t read;
    size_t len;

    file = fopen("input-03.txt", "r");
    if (file == NULL) {

        printf("Error while reading the file.\n");
        return 1;
    }

    int fabric[1001][1001] = { 0 };
    int claims[1500] = { [0 ... 1499] = -1 };

    int i, j;
    int id, x, y, w, h;

    while((read = getline(&line, &len, file)) != -1) {

        sscanf(line, "#%d @ %d,%d: %dx%d", &id, &x, &y, &w, &h);
        claims[id] = 0;

        for (i = x ; i < (x + w) ; i++) {

            for (j = y ; j < (y + h) ; j++) {

                if (fabric[i][j] != 0) {

                    claims[id]++;
                    claims[fabric[i][j]]++;
                }

                fabric[i][j] = id;
            }
        }
    }

    for (i = 0 ; i < 1500 ; i++)
        if (claims[i] == 0)
            printf("#%d doesn't overlap\n", i);
    
    fclose(file);

    return 0;
}
