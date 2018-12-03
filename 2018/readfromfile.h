#ifndef H_INCLUDED_READFROMFILE
#define H_INCLUDED_READFROMFILE

    #include <stdio.h>
    #include <stdlib.h>

    char* readfromfile(char* filename) {

        FILE* file = fopen(filename, "r");
        char* content;
        size_t n = 0;
        int c;

        if (file == NULL)
            return NULL;

        fseek(file, 0, SEEK_END);
        long filesize = ftell(file);

        fseek(file, 0, SEEK_SET);
        content = (char*) malloc(filesize);

        while ((c = fgetc(file)) != EOF)
            content[n++] = (char) c;

        content[n] = '\0';
        fclose(file);

        return content;
    }

#endif
