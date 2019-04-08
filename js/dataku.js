// Initialize Firebase
var config = {
  apiKey: "AIzaSyAXtA-LRt0PXcX9rTK-Shmqr7jBt4-3Zlg",
  authDomain: "registrasi-103b2.firebaseapp.com",
  databaseURL: "https://registrasi-103b2.firebaseio.com",
  projectId: "registrasi-103b2",
  storageBucket: "registrasi-103b2.appspot.com",
  messagingSenderId: "23231866580"
};
firebase.initializeApp(config);

var mhs = firebase.database().ref().child("mahasiswa");
var table = $('#tablemhs').DataTable({
  "language": {
      "zeroRecords": " "
    },
  "responsive": true
});

mhs.on("child_added", snap => {
  var dataSet = [snap.child("nim").val(),
                snap.child("nama").val(),
                snap.child("prodi").val(),
                snap.child("tgl_masuk").val(),
                snap.child("email").val(),
                snap.child("ipk").val(),];
  table.rows.add([dataSet]).draw();
});

function cekMahasiswa(){
  var nim = $('#nim').val();
  var email = $('#email').val();
  $.getJSON("https://siska.kharisma.ac.id/api/detailmhs/nim/"+nim, function(jd){
    if (jd !== undefined){
      if (nim == jd.nimhs){
        if (email == jd.email){
          var nmprodi = "";
          $.getJSON("https://siska.kharisma.ac.id/api/detailprodi/kode/"+jd.prodi, function(result){
            nmprodi = result.program_studi.nama;
            putMahasiswa(jd.nimhs,jd.namamhs,nmprodi,jd.tanggal_masuk,jd.email,jd.ipk);
          });
        }
        else {
          alert('Email salah!');
          $('#email').focus();
        }
      }
    }
    else {
      alert('NIM tidak ditemukan!');
      $('#nim').focus();
    }
  });
}

function putMahasiswa(nim,nama,prodi,tgl_masuk,email,ipk){
  mhs.once('value', function(snapshot) {
    if (snapshot.hasChild(nim)) {
     alert('Mahasiswa sudah terdaftar!');
   }
   else {
     mhs.child(nim).set({
       nim : nim,
       nama: nama,
       prodi : prodi,
       tgl_masuk : tgl_masuk,
       email : email,
       ipk : ipk
     });
     alert('Mahasiswa berhasil terdaftar!');
     $('#registrasi')[0].reset();
   }
});
}
