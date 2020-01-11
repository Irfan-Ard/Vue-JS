<template>
    <div class="main">
        
        <v-container>
            <v-card>
                <!-- header -->
                <v-card-title>
                    <h1>Manage</h1>
                    <v-spacer></v-spacer>
                    <v-btn @click="reload" class="ma-2" color="primary" dark>
                        <i class="material-icons">refresh</i>
                    </v-btn>
                    <v-btn @click="showDial" class="ma-2" color="primary" dark>Add new
                        <i class="material-icons">add</i>
                    </v-btn>
                </v-card-title>
                <!-- dialog add -->
                <v-row>
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-card>
                            <v-card-title>
                                <h2>Add new data</h2>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="data.id" label="ID" required></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="data.name" label="Name" required></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="data.nominal" label="Nominal" required></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                    <v-btn class="white--text" @click.prevent="close" color="red">
                                        Cancel
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn @click.prevent="addData" color="primary">
                                        Add
                                        <i class="material-icons">send</i>
                                    </v-btn>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-row>

                <!-- table -->
                <v-simple-table>
                    <thead>
                        <tr>
                            <th><h1>#</h1></th>
                            <th><h1>Name</h1></th>
                            <th><h1>Nominal</h1></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="show in showMoney" :key="show.id">
                            <td>{{show.id}}</td>
                            <td>{{show.name}}</td>
                            <td>Rp. {{show.nominal}}</td>
                            <td style="text-align: right">
                                <i @click.prevent="edit(show)" id="edit" class="material-icons">border_color</i>
                                <i @click.prevent="remove(show.id)" id="delete" class="material-icons">delete</i>
                            </td>
                            <!-- dialog edit -->
                            <v-row>
                                <v-dialog v-if="editId === show.id" v-model="alert" max-width="500px">
                                    <v-card>
                                        <v-card-title>
                                            Edit Form    
                                        </v-card-title>
                                        <v-card-text>
                                            <div>{{show.id}}</div>
                                            <v-text-field v-model="editData.name" label="Name"></v-text-field>
                                            <v-text-field v-model="editData.nominal" label="Nominal"></v-text-field>
                                        </v-card-text>
                                        <v-card-text>
                                            <v-row>
                                                <v-btn icon>
                                                    <v-btn @click="onCancel" class="red white--text">Cancel</v-btn>
                                                </v-btn>
                                                <v-spacer></v-spacer>
                                                <v-btn icon>
                                                    <v-btn @click="onEdit(show.id)" class="primary">Edit <i class="material-icons">create</i></v-btn>
                                                </v-btn>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                            </v-row>

                            <!-- dialog delete -->
                            <v-row>
                                <v-dialog v-if="deleteId === show.id" v-model="alertDel" max-width="500px">
                                    <v-card>
                                        <v-card-title>
                                            <h3>Are you sure want to delete {{show.id}}?</h3>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-row>
                                                <v-btn-icon>
                                                    <v-btn @click.prevent="cancelDel" class="red white--text">Cancel</v-btn>
                                                </v-btn-icon>
                                                <v-spacer></v-spacer>
                                                <v-btn-icon>
                                                    <v-btn @click="onDelete(show.id)" class="primary">Delete<i class="material-icons">check</i></v-btn>
                                                </v-btn-icon>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                            </v-row>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card>
        </v-container>

        <v-container>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title>
                            <h1>Balance</h1>
                            <v-spacer></v-spacer>
                            <v-btn @click="showBalance" class="ma-2" color="primary" dark>Add Balance
                                <i class="material-icons">add</i>
                            </v-btn>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <h3>Current Balance:</h3>
                                    <p>Rp. {{pemasukan}}</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <h3>Spending:</h3>
                                    <p>Rp. {{pengeluaran}}</p>
                                </v-col>
                                <v-col>
                                    <h3>Savings:</h3>
                                    <p>Rp. {{hasilDataSaving}}</p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>

                <!-- balance dialog -->
                <v-dialog v-model="balanceDial" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <h2>Add Balance</h2>
                        </v-card-title>
                        <v-card-text>
                            <v-text-field v-model="Balance" label="Nominal"></v-text-field>
                        </v-card-text>
                        <v-card-text>
                            <v-row>
                                <v-btn-icon>
                                    <v-btn @click.prevent="cancelBalance" class="red white--text">Cancel</v-btn>
                                </v-btn-icon>
                                <v-spacer></v-spacer>
                                <v-btn-icon>
                                    <v-btn @click.prevent="addBalance" class="primary">Add</v-btn>
                                </v-btn-icon>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-dialog>

                <!-- savings -->
                <v-col>
                    <v-card>
                        <v-card-title>
                            <h1>Savings</h1>
                            <v-spacer></v-spacer>
                            <v-btn class="primary" @click="showSaving">
                                Add Savings <i class="material-icons">add</i>
                            </v-btn>
                        </v-card-title>
                        <v-card-text>
                            <v-simple-table fixed-header height="183px">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Nominal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="saving in savingResult" :key="saving.id">
                                        <td>{{saving.id}}</td>
                                        <td>{{saving.name}}</td>
                                        <td>{{saving.type}}</td>
                                        <td>Rp. {{saving.nominal}}</td>
                                        <td>
                                            <i @click="editSaving(saving)" class="material-icons">create</i>
                                            <i @click="deleteSaving(saving.id)" class="material-icons">delete</i>
                                        </td>
                                        <!-- delete saving -->
                                        <v-dialog v-model="showDeleteSaving" max-width="500px">
                                            <v-card>
                                                <v-card-title>
                                                    <h3>Are you sure want to delete {{deleteSavingId}} ?</h3>
                                                </v-card-title>
                                                <v-card-text>
                                                    <v-row>
                                                        <v-btn-icon>
                                                            <v-btn class="red white--text" @click="cancelDeleteSaving">
                                                                Cancel
                                                            </v-btn>
                                                        </v-btn-icon>
                                                        <v-spacer></v-spacer>
                                                        <v-btn-icon>
                                                            <v-btn class="primary" @click="onDeleteSaving">
                                                                Delete
                                                            </v-btn>
                                                        </v-btn-icon>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                        </v-dialog>

                                        <!-- edit saving -->
                                        <v-dialog v-model="showEditSaving" max-width="500px">
                                            <v-card>
                                                <v-card-title>
                                                    <h2>Form Edit</h2>
                                                </v-card-title>
                                                <v-card-text>
                                                    <v-row>
                                                        <v-col>
                                                            <v-text-field disabled label="ID" v-model="editSavingId"></v-text-field>
                                                        </v-col>
                                                        <v-col>
                                                            <v-text-field label="Type" v-model="dataEditSaving.type"></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-col>
                                                            <v-text-field label="Name" v-model="dataEditSaving.name"></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-col>
                                                            <v-text-field label="Nominal" v-model="dataEditSaving.nominal"></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-btn class="red white--text" @click="onCancelEditSaving">
                                                            Cancel
                                                        </v-btn>
                                                        <v-spacer></v-spacer>
                                                        <v-btn class="primary" @click="onEditSaving">
                                                            Edit
                                                        </v-btn>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                        </v-dialog>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                        </v-card-text>
                    </v-card>
                </v-col>
                
                <!-- saving dialog -->
                <v-dialog v-model="dialSaving" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <h2>Add Saving</h2>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <v-text-field v-model="dataSaving.id" label="ID"></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field v-model="dataSaving.type" label="Type"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-text-field v-model="dataSaving.name" label="Name"></v-text-field>
                            <v-text-field v-model="dataSaving.nominal" label="Nominal"></v-text-field>
                            <v-row>
                                <v-btn-icon>
                                    <v-btn @click="cancelSaving" class="red white--text">Cancel</v-btn>
                                </v-btn-icon>
                                <v-spacer></v-spacer>
                                <v-btn-icon>
                                    <v-btn @click="addSaving" class="primary">Add</v-btn>
                                </v-btn-icon>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import db from '../firebase'

export default {
    data(){
        return{
            data:{
                id:null,
                name:null,
                nominal:null
            },
            editData:{
                id:null,
                name:null,
                nominal:null
            },
            editId:null,
            showMoney:[],
            dialog: false,
            alert: false,
            alertDel: true,
            deleteId: null,
            jumlahPengeluaran:[],
            pengeluaran: null,
            pemasukan: null,
            balanceDial: false,
            Balance: null,
            dataBalance: null,
            dataSaving:{
                id:null,
                type:null,
                name:null,
                nominal:null
            },
            savingResult: null,
            dialSaving: false,
            showDeleteSaving: false,
            deleteSavingId: null,
            editSavingId: null,
            dataEditSaving:{
                type: null,
                name: null,
                nominal: null
            },
            showEditSaving: false,
            hasilSaving: [],
            hasilDataSaving: null
        }
    },

    created(){
        this.readSavings()
        this.readData()
        this.readData2()
    },

    methods:{
        readData2(){
            db.collection('pemasukan').get()
            .then(querySnapshot => {
                let showData = null
                querySnapshot.forEach(doc => {
                    let convert = parseInt((doc.data().nominal))
                    showData = convert
                })
                let jumlah = this.hasilDataSaving + this.pengeluaran
                this.pemasukan = showData - jumlah
            })
        },
        readData(){
            db.collection('money').get()
                .then(querySnapshot => {
                const showData=[]
                // pengeluaran
                const showData2=[]
                querySnapshot.forEach( doc => {
                    showData.push(doc.data())
                    // pengeluaran
                    let convert = parseInt(doc.data().nominal)
                    showData2.push(convert)
                })
                this.showMoney = showData
                // pengeluaran
                this.jumlahPengeluaran = showData2

                // looping pengeluaran
                let count = null
                for (let i = 0; i < this.jumlahPengeluaran.length; i++) {
                    count += this.jumlahPengeluaran[i]
                }
                this.pengeluaran = count
            })
        },
        readSavings(){
            db.collection('savings').get()
            .then(querySnapshot => {
                const data = []
                const showData = []
                querySnapshot.forEach( doc =>{
                    let convert = parseInt(doc.data().nominal)
                    data.push(convert)
                    showData.push(doc.data())
                })
                this.hasilSaving = data
                this.savingResult = showData

                let count = null
                for (let index = 0; index < this.hasilSaving.length; index++) {
                   count += this.hasilSaving[index];
                }
                this.hasilDataSaving = count
            })
        },
        showDial(){
            if(this.dialog == false){
                this.dialog = true
                this.data = {}
            }
        },

        reload(){
            window.location.reload()
        },

        close(){
            if(this.dialog == true){
                this.dialog = false
            }
        },

        addData(){
            if(this.data.id == null){
                alert('oops...')
                this.dialog = false
            }else if(this.data.nominal == null){
                alert('oops...')
                this.dialog = false
            }else if(this.data.name == null){
                alert('oops...')
                this.dialog = false
            }else{
                db.collection('money')
                .add(this.data)
                .then(
                this.readData(),
                this.dialog = false,
                ),this.readData2()
            }
        },

        onCancel(){
            this.editId = '',
            this.editData.name = '',
            this.editData.nominal = '',
            this.alert = false
        },

        edit(show){
            this.alert = true
            this.editId = show.id
            this.editData.name = show.name
            this.editData.nominal = show.nominal
        },

        onEdit(){
            db.collection('money').where('id', '==', this.editId).get()
            .then( querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.set({
                        id: this.editId,
                        name: this.editData.name,
                        nominal: this.editData.nominal
                    }),this.readData(),this.readData2()
                }),this.onCancel()
            })
        },

        remove(id){
            this.alertDel = true
            this.deleteId = id
            console.log(this.deleteId)
        },

        onDelete(id){
            db.collection('money').where('id', '==' , this.deleteId).get()
            .then(querySnapshot => {
                console.log(id)
                console.log(this.deleteId)
                querySnapshot.forEach(doc => {
                    doc.ref.delete()
                }),this.readData(),this.readData2()
            }),this.cancelDel()
        },

        cancelDel(){
            // this.deleteId = ''
            this.alertDel = false
        },

        showBalance(){
            if(this.balanceDial == false){
                this.balanceDial = true
            }
            this.Balance = null
        },

        cancelBalance(){
            if(this.balanceDial == true){
                this.balanceDial = false
            }
        },

        addBalance(){
            let convert = parseInt(this.Balance)
            this.dataBalance = convert + this.pemasukan
            this.pemasukan = this.dataBalance

            db.collection('pemasukan').where('id', '==', '1').get()
            .then(querySnapshot => {
                querySnapshot.forEach( doc =>{
                    doc.ref.set({
                        id: '1',
                        name: 'Gaji Pokok',
                        nominal: this.pemasukan
                    })
                }),this.cancelBalance()
            })
        },

        showSaving(){
            if(this.dialSaving == false){
                this.dialSaving = true
                this.dataSaving = {}
            }
        },

        addSaving(){
            db.collection('savings')
            .add(this.dataSaving)
            .then(
                this.dialSaving = false,
            ),this.readSavings(),this.readData2()
        },

        cancelSaving(){
            if(this.dialSaving == true){
                this.dialSaving = false
            }
        },
        deleteSaving(id){
            this.deleteSavingId = id
            if(this.showDeleteSaving == false){
                this.showDeleteSaving = true
            }
        },
        onDeleteSaving(){
            db.collection('savings').where('id', '==', this.deleteSavingId).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete()
                    this.showDeleteSaving = false
                }),this.readSavings(),this.readData2()
            })
        },
        cancelDeleteSaving(){
            if(this.showDeleteSaving == true){
                this.showDeleteSaving = false
            }
        },
        editSaving(saving){
            if(this.showEditSaving == false){
                this.showEditSaving = true
            }
            this.editSavingId = saving.id
            this.dataEditSaving.type = saving.type
            this.dataEditSaving.name = saving.name
            this.dataEditSaving.nominal = saving.nominal
        },
        onCancelEditSaving(){
            this.showEditSaving = false
            this.editSavingId = ''
            this.dataEditSaving.type = ''
            this.dataEditSaving.name = ''
            this.dataEditSaving.nominal = ''
        },
        onEditSaving(){
            db.collection('savings').where('id', '==', this.editSavingId).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.set({
                        id: this.editSavingId,
                        type: this.dataEditSaving.type,
                        name: this.dataEditSaving.name,
                        nominal: this.dataEditSaving.nominal
                    }),this.readSavings(),this.readData2()
                }),this.onCancelEditSaving()
            })
        }
    }
}

</script>

<style scoped>
    #edit{
        color: blue;
        cursor: pointer;
        margin-right: 10px;
    }
    #delete{
        color: red;
        cursor: pointer;
    }
</style>