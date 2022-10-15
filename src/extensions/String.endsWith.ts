declare global {
    interface String {
        endsWith(suffix: string): boolean;
    }
  }  



String.prototype.endsWith = function(suffix:string) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};


export {}

