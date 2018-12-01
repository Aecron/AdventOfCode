#ifndef H_INCLUDED_ARRAYD
#define H_INCLUDED_ARRAYD

    #include <stdlib.h>

    // it would take less time to realloc() only once in a while (size * 2) instead of everytime we insert an element, but what the hell.
    typedef struct {

        int* data;
        size_t size;
    } Array;

    void initArray(Array* array) {

        array->data = NULL;
        array->size = 0;
    }

    void insertArray(Array* array, int element) {

        array->data = (int*) realloc(array->data, ++array->size * sizeof(int));
        array->data[array->size - 1] = element;
    }

    void freeArray(Array* array) {

        free(array->data);
        initArray(array);
    }

    int inArray(const Array* array, int value) {

        size_t i;
        for (i = 0 ; i < array->size ; i++)
            if (array->data[i] == value)
                return 1;

        return 0;
    }

    void printArray(const Array* array) {

        size_t i;
        
        printf("\n=====\n");

        for (i = 0 ; i < array->size ; i++)
            printf("%d ", array->data[i]);

        printf("\n=====\n");
    }

#endif
