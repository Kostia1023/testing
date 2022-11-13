<template>
  <div>
    Кількість елемнтів
    <input type="number" name="size" id="size" v-model="size" />
    <div class="table">
      <div v-for="(el, id) in arr" :key="id" class="cell width">
        <input
          type="number"
          name="number"
          :id="'id'+id"
          v-model="arr1[id]"
          class="width2"
        />
      </div>
    </div>
    <div class="table">
      <div v-for="(el, id) in arrY" :key="id" class="cell width">
        <input
          type="number"
          name="number"
          :id= "'id' + (this.size + id)"
          v-model="arr2[id]"
          class="width2"
        />
      </div>
    </div>
    <div></div>
    <div>Залишковий член лагранжа = {{ maxL }}</div>
    <div>Залишковий член ньютона = {{ maxN }}</div>
    <div>Залишковий член ньютона вперед = {{ maxNF }}</div>
    <div>Залишковий член ньютона назад = {{ maxNB }}</div>

    <div>
      x =
      <input type="number" name="number" id="x" v-model="x" />
    </div>
    <div>Лагранж для Х = {{ LagrangX }}</div>
    <div>Ньютон для Х = {{ NewtonX }}</div>

    <button @click="button1">Lagrang</button>
    <button @click="button2">Newton</button>
    <button @click="button3">NewtonF</button>
    <button @click="button4">NewtonB</button>
    <button @click="button5">All</button>
  </div>
</template>

<script>
export default {
  name: "TableCustom",
  data() {
    return {
      size: 4,
      arr1: [],
      arr2: [],
      x: 0,
      sum: 0,
      n: 10,
      a: 3,
      b: 4,
      m: 10000,
      maxL: 0,
      maxN: 0,
      maxNF: 0,
      maxNB: 0,
    };
  },
  methods: {
    createMatrix(arr) {
      this.arr1 = arr;
    },
    createMatrix2(arr) {
      this.arr2 = arr;
    },
    Lagrang(x) {
      let sum = 0;
      let arrX = this.arr1;
      let arrY = this.arr2;
      for (let i = 0; i < this.size; i++) {
        let arrX2 = [...arrX];
        arrX2.splice(i, 1);
        let a = 1;
        let b = 1;
        for (let j = 0; j < this.size - 1; j++) {
          a *= x - arrX2[j];
          b *= arrX[i] - arrX2[j];
        }
        sum += arrY[i] * (a / b);
      }
      return sum;
    },
    myRandomInts(quantity, min, max) {
      let arr = [];
      while (arr.length < quantity) {
        var candidateInt = Math.random() * (max - min) + min;
        if (arr.indexOf(candidateInt) === -1) arr.push(candidateInt);
      }
      return arr;
    },
    Newton(x) {
      let arrX = this.arr1;
      let arrY = this.arr2;
      let arrRes = [[...arrY]];
      for (let i = 0; i < this.size - 1; i++) {
        let arrT = [];
        for (let j = 0; j < this.size - i - 1; j++) {
          let el =
            (arrRes[i][j + 1] - arrRes[i][j]) / (arrX[j + 1 + i] - arrX[j]);
          arrT.push(el);
        }
        arrRes.push(arrT);
      }
      let N = 0;
      for (let i = 0; i < arrRes.length; i++) {
        let m = arrRes[i][0];
        for (let j = 0; j < i; j++) {
          m *= x - arrX[j];
        }
        N += m;
      }
      return N;
    },
    NewtonF(x) {
      let arrX = this.arr1;
      let arrY = this.arr2;
      let arrRes = [[...arrY]];
      for (let i = 0; i < this.size - 1; i++) {
        let arrT = [];
        for (let j = 0; j < this.size - i - 1; j++) {
          let el = arrRes[i][j + 1] - arrRes[i][j];
          arrT.push(el);
        }
        arrRes.push(arrT);
      }
      let N = 0;
      for (let i = 0; i < arrRes.length; i++) {
        let m = arrRes[i][0];
        for (let j = 0; j < i; j++) {
          m *= x - arrX[j];
        }
        N += m / (this.factorialize(i) * this.h ** i);
      }
      return N;
    },
    NewtonB(x) {
      let arrX = this.arr1;
      let arrY = this.arr2;
      let arrRes = [[...arrY]];
      for (let i = 0; i < this.size - 1; i++) {
        let arrT = [];
        for (let j = 0; j < this.size - i - 1; j++) {
          let el = arrRes[i][j + 1] - arrRes[i][j];
          arrT.push(el);
        }
        arrRes.push(arrT);
      }
      let N = 0;
      for (let i = 0; i < arrRes.length; i++) {
        let m = arrRes[i][arrRes[i].length - 1];
        for (let j = 0; j < i; j++) {
          m *= x - arrX[arrRes.length - j - 1];
        }
        N += m / (this.factorialize(i) * this.h ** i);
      }
      return N;
    },
    Cheshibova(i) {
      let el1 = (this.b + this.a) / 2;
      let el2 =
        ((this.b - this.a) / 2) *
        Math.cos(((2 * i + 1) / (2 * (this.n + 1))) * Math.PI);
      return el1 + el2;
    },
    factorialize(num) {
      if (num < 0) return -1;
      else if (num == 0) return 1;
      else {
        return num * this.factorialize(num - 1);
      }
    },
    f(x) {
      return x ** 2; //Math.log(4 + 5 * Math.E ** x);
    },
    button1() {
      let arrF1 = [];
      let arrCheshibova = this.arrCheshibova;
      for (let i = 0; i < this.n + 1; i++) {
        arrF1.push(this.f(arrCheshibova[i]));
      }
      this.arr1 = [...arrCheshibova];
      this.arr2 = [...arrF1];
      this.size = this.n + 1;

      let max = 0;
      for (let i = 0; i < this.m; i++) {
        let el = this.a + ((this.b - this.a) / this.m) * i;
        let num1 = this.f(el);
        let num2 = this.Lagrang(el);
        let el2 = num1 - num2;

        if (max < Math.abs(el2)) {
          max = Math.abs(el2);
        }
      }
      this.maxL = max;
    },
    button2() {
      this.size = this.n + 1;

      let arrX = this.myRandomInts(this.n + 1, this.a, this.b);
      arrX.sort((a, b) => a - b);
      let arrY = arrX.map((el) => this.f(el));
      this.arr1 = [...arrX];
      this.arr2 = [...arrY];

      let max = 0;
      for (let i = 0; i < this.m; i++) {
        let el = this.a + ((this.b - this.a) / this.m) * i;
        let num1 = this.f(el);
        let num2 = this.Newton(el);
        let el2 = num1 - num2;

        if (max < Math.abs(el2)) {
          max = Math.abs(el2);
        }
      }
      this.maxN = max;
    },
    button3() {
      this.size = this.n;
      let arrX = [];
      for (let i = 0; i < this.n; i++) {
        arrX.push(this.a + i * this.h);
      }
      let arrY = arrX.map((el) => this.f(el));
      this.arr1 = [...arrX];
      this.arr2 = [...arrY];

      let max = 0;
      for (let i = 0; i < this.m; i++) {
        let el = this.a + ((this.b - this.a) / this.m) * i;
        let num1 = this.f(el);
        let num2 = this.NewtonF(el);
        let el2 = num1 - num2;

        if (max < Math.abs(el2)) {
          max = Math.abs(el2);
        }
      }
      this.maxNF = max;
    },
    button4() {
      this.size = this.n;
      let arrX = [];
      for (let i = 0; i < this.n; i++) {
        arrX.push(this.a + i * this.h);
      }
      let arrY = arrX.map((el) => this.f(el));
      this.arr1 = [...arrX];
      this.arr2 = [...arrY];

      let max = 0;
      for (let i = 0; i < this.m; i++) {
        let el = this.a + ((this.b - this.a) / this.m) * i;
        let num1 = this.f(el);
        let num2 = this.NewtonB(el);
        let el2 = num1 - num2;

        if (max < Math.abs(el2)) {
          max = Math.abs(el2);
        }
      }
      this.maxNB = max;
    },
    button5() {
      this.size = this.n;

      let arrX = [];
      for (let i = 0; i < this.n; i++) {
        arrX.push(this.a + i * this.h);
      }
      let arrY = arrX.map((el) => this.f(el));
      this.arr1 = [...arrX];
      this.arr2 = [...arrY];

      let max = 0;
      for (let i = 0; i < this.m; i++) {
        let el = this.a + ((this.b - this.a) / this.m) * i;
        let num1 = this.f(el);
        let num2 = this.Lagrang(el);
        let el2 = num1 - num2;

        if (max < Math.abs(el2)) {
          max = Math.abs(el2);
        }
      }
      this.maxL = max;
      max = 0;
      for (let i = 0; i < this.m; i++) {
        let el = this.a + ((this.b - this.a) / this.m) * i;
        let num1 = this.f(el);
        let num2 = this.Newton(el);
        let el2 = num1 - num2;

        if (max < Math.abs(el2)) {
          max = Math.abs(el2);
        }
      }
      this.maxN = max;
      max = 0;

      for (let i = 0; i < this.m; i++) {
        let el = this.a + ((this.b - this.a) / this.m) * i;
        let num1 = this.f(el);
        let num2 = this.NewtonF(el);
        let el2 = num1 - num2;

        if (max < Math.abs(el2)) {
          max = Math.abs(el2);
        }
      }
      this.maxNF = max;
      max = 0;

      for (let i = 0; i < this.m; i++) {
        let el = this.a + ((this.b - this.a) / this.m) * i;
        let num1 = this.f(el);
        let num2 = this.NewtonB(el);
        let el2 = num1 - num2;

        if (max < Math.abs(el2)) {
          max = Math.abs(el2);
        }
      }
      this.maxNB = max;
    },
  },
  computed: {
    arr() {
      let arr = [];
      for (let i = 0; i < this.size; i++) {
        arr.push(this.arr1[i] ?? 0);
      }
      this.createMatrix(arr);
      return arr;
    },
    LagrangX() {
      return this.Lagrang(this.x);
    },
    NewtonX() {
      return this.Newton(this.x);
    },

    arrY() {
      let arr2 = [];
      for (let i = 0; i < this.size; i++) {
        arr2.push(this.arr2[i] ?? 0);
      }
      this.createMatrix2(arr2);
      return arr2;
    },
    arrCheshibova() {
      let arr = [];
      for (let i = 0; i < this.n + 1; i++) {
        arr.push(this.Cheshibova(i));
      }
      return arr;
    },
    h() {
      return (this.b - this.a) / this.size;
    },
  },
};
</script>
<style>
.table {
  display: flex;
}
.cell {
  border: solid;
}
.width {
  max-width: 100px;
}

.width2 {
  max-width: 90px;
}
</style>
