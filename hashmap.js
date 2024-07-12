
class Node{
    constructor(pair){
        this.pair = pair;
        this.next = null;
    }
}



class Pair{
    constructor(key,value){
        this.key = key;
        this.value = value;
    }
}

class HashMap{
    #capacity;
    #loadFactor;
    #map;
    #currentSize;
    constructor(){
        this.#capacity = 16;
        this.#loadFactor = 0.75;
        this.#map = [];
        this.#currentSize = 0;


    }

    #hash(key){

        let hashCode = 0;
        const primeNumber = 31;
        
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i))%this.#capacity;
        }

        return hashCode;
    }

    #reset(key,value){
        
        let index = this.#hash(key);

        if (index < 0 || index >= this.#capacity) {
            throw new Error("Trying to access index out of bound");
          }

        if(this.#map[index]){

            // if the key is in the #map it's value will be overwritten
            if(this.#map[index].pair.key === key){
                this.#map[index].pair.value = value;
            }
            // if collision occurred it uses chaining to resolve
            else{
                    let pointer = this.#map[index];
                    while(pointer.next){
                        pointer = pointer.next;
                    }
                    pointer.next = new Node(new Pair(key,value));
                }
            }

        else{

            this.#map[index] = new Node(new Pair(key,value));
            this.#currentSize++;
        }
    }

    #rehash(){
        this.#capacity = this.#capacity*2;
        this.#currentSize = 0;
        let copyMap = [...this.#map]
        this.#map = [];

        for(let i = 0; i< this.#capacity; i++){
            if(copyMap[i]){
                let pointer = copyMap[i];
                while(pointer){
                    this.#reset(pointer.pair.key,pointer.pair.value);
                    pointer = pointer.next;


                   
                }

            }
            

        }

    }



    set(key , value){

        let index = this.#hash(key);
        this.#currentSize++;

        if(this.#map[index]){

            // if the key is in the #map it's value will be overwritten
            if(this.#map[index].pair.key === key){
                this.#map[index].pair.value = value;
            }
            // if collision occurred it uses chaining to resolve
            else{
                    let pointer = this.#map[index];
                    while(pointer.next){
                        pointer = pointer.next;
                    }
                    pointer.next = new Node(new Pair(key,value));
                }
            }

        else{

            this.#map[index] = new Node(new Pair(key,value));
           
        }

        if( this.#currentSize >= (this.#loadFactor*this.#capacity)  ){
            this.#rehash();
        }

        }

    get(key){

        let index = this.#hash(key);
        if(this.#map[index]){
            if(this.#map[index].pair.key === key){
                return this.#map[index].pair.value;
            }
            else{
                let pointer = this.#map[index];
                while(pointer.next){
                    if(pointer.pair.key === key){
                        return pointer.pair.value
                    }
                    pointer = pointer.next;
                }

                return null;

            }

        }
     
        return null;
    }
    
    has(key){
        let index = this.#hash(key);
        if(this.#map[index]){
            if(this.#map[index].pair.key === key){
                return true;
            }
            else{
                let pointer = this.#map[index];
                while(pointer.next){
                    if(pointer.pair.key === key){
                        return true
                    }
                    pointer = pointer.next;
                }

                return false;

            }

        }
     
        return false;

    }


    remove(key){

        let index = this.#hash(key);
        if(this.#map[index]){

            if(this.#map[index].pair.key === key){

                if(this.#map[index].next){
                    this.#map[index] = this.#map[index].next;
                }
                else{
                    this.#map[index] = null;
                }
                return ;

            }
            
            else{
                    
                let pointer = this.#map[index];

                while(pointer){
                    if( pointer.next && pointer.next.pair.key === key){
                        
                        pointer.next = pointer.next.next;
                        return 
                    }
                    pointer = pointer.next;
                }

                throw new Error("Trying to remove key which does not exsit")

            }

        }
     
        throw new Error("Trying to remove key which does not exsit ")

    }

    length(){
        let lengh = 0;

        for(let i = 0; i< this.#capacity; i++){
            if(this.#map[i]){
                let pointer = this.#map[i];
                while(pointer){
                    pointer = pointer.next;
                    lengh++;
                }

            }
            

        }

        return lengh
    }

    clear(){
        this.#capacity = 16;
        this.#map = [];
        this.#currentSize = 0;


    }

    keys(){
        let h_keys = [];

        for(let i = 0; i< this.#capacity; i++){
            if(this.#map[i]){
                let pointer = this.#map[i];
                while(pointer){
                    h_keys.push(pointer.pair.key)
                    pointer = pointer.next;
                   
                }

            }
            

        }

        return h_keys


    }

    values(){
        let values = [];

        for(let i = 0; i< this.#capacity; i++){
            if(this.#map[i]){
                let pointer = this.#map[i];
                while(pointer){
                    values.push(pointer.pair.value)
                    pointer = pointer.next;
                   
                }

            }
            

        }

        return values

    }

    entries(){
        let entries = [];

        for(let i = 0; i< this.#capacity; i++){
            if(this.#map[i]){
                let pointer = this.#map[i];
                while(pointer){
                    entries.push(pointer.pair)
                    pointer = pointer.next;
                   
                }

            }
            

        }

        return entries
        
    }

}






