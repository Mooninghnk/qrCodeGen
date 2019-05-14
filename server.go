package main

import (
	"encoding/json"
	"fmt"
	"github.com/skip2/go-qrcode"
	"net/http"
)

//QrCode to struct the qrCode gen function
type QrCode struct {
	Text string `json:"input"`
}
type Response struct {
	Binary []byte `json:"bytes"`
}

func genQrCode(text string) ([]byte, error) {
	return qrcode.Encode(text, qrcode.Medium, 256)
}

func print(val ...interface{}) {
	for _, each := range val {
		fmt.Println(each)
	}
}

func handlePost(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		inp := QrCode{}
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&inp)
		if err != nil {
			print(err)
		}
		png, err := genQrCode(inp.Text)
		if err != nil {
			print(err)
		}
		print(inp)
		data := Response{png}
		json.NewEncoder(w).Encode(&data.Binary)
	}
}
func main() {
	http.HandleFunc("/api/inp", handlePost)
	http.ListenAndServe(":8000", nil)
}
