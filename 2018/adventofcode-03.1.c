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
    int i, j;
    int id, x, y, w, h;

    while((read = getline(&line, &len, file)) != -1) {

        sscanf(line, "#%d @ %d,%d: %dx%d", &id, &x, &y, &w, &h);

        for (i = x ; i < (x + w) ; i++)
            for (j = y ; j < (y + h) ; j++)
                fabric[i][j]++;
    }

    int count = 0;
    for (i = 0 ; i < 1001 ; i++)
        for (j = 0 ; j < 1001 ; j++)
            if (fabric[i][j] > 1)
                count++;

    printf("Overlapping fabric inches: %d\n", count);
    
    fclose(file);

    return 0;
}
