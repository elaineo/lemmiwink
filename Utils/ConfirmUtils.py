import random
                
def pin_gen(id):
    #e's craptastic hash function
    random.seed(id)
    return random.randint(0,9999)