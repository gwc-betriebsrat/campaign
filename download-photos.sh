#!/usr/bin/env bash
# Downloads all candidate photos from zlife and saves them to pages/who-we-are/photos/
# Usage: COYOSESSION=<your-session-token> bash download-photos.sh

set -euo pipefail

SESSION="${COYOSESSION:-}"
if [[ -z "$SESSION" ]]; then
  echo "ERROR: set COYOSESSION env var first"
  echo "  export COYOSESSION=<your token from browser DevTools>"
  exit 1
fi

BASE_URL="https://zlife.zalando.net/web/senders/56266ee2-48ad-4b42-9d04-9dee0226c6ec/documents"
OUT_DIR="$(dirname "$0")/pages/who-we-are/photos"
mkdir -p "$OUT_DIR"

# Doc IDs extracted from the CANDIDATES array in who-we-are-v3/index.html
DOC_IDS=(
  a7d18175-5623-4b2c-8882-bd5ebbefab00  # Wilfredo Manrique
  76d4f49a-a96d-4ead-bf69-ab91ac2f56b4  # Daniel Calderon
  0dc8f072-9531-4ca9-8b91-7947adf7642a  # Kim Ozor
  68e9642b-edb6-4aff-b963-6db5f0a83ba3  # Mosheera Salah
  d3cf3c6b-08f8-4b50-86dd-bf8b6fc52179  # Mahmoud Gaballah
  04d0c277-9276-4148-97fb-9400441eba83  # Andrea Sella
  bb86940d-27ad-4103-b995-cc5ba7414e7c  # Daniela Nigro
  8df3a8e8-24c2-4a7a-9501-4d7293acf7e1  # Ahmed Ebaid
  37bfa26f-3048-4004-a581-3158fa547a03  # Veda Maas
  21e94f92-c65c-495b-83fa-61b43b24a384  # Bassma Elrafie
  a7283332-937b-4d50-b511-7b5ccd72cc36  # Míriam Sabaté
  f9622fe6-7fea-4aca-afff-0940d23905a5  # Lara Laila Gärber
  3e3aebb9-5c52-4eaa-b891-86407495e6bd  # Frankie Thyer
  2fc27818-28c6-410e-a805-d2c02a554e38  # Wasim Sawalha
  3c404962-3b68-4ff6-b8ae-849349ced2a0  # Hakkim Alavudeen
  b439df51-9e6f-4a5a-bc1a-f1e1ef1bd21f  # Hesham Abdelhamid
  d0c109c3-fd3a-416d-93ae-ad0f58fb4700  # Sylvia Lu
  251f3e6e-173b-4f37-bc01-3abe6ad2b16e  # Lucía Morales
  fbffdc62-cab7-4d29-a5ee-81a5db7b0148  # Casper Rutz
  36a2b6dd-4f45-441f-a4b3-ff8c0dd227f1  # Ammad Nasir
  a3f919a5-0ebf-4d92-ab98-c5429ac2bc72  # Katja Eikenberg
  120aa7b6-3837-43fe-8212-5304aac9020e  # Felipe Marin
  32a04d29-99eb-43d2-bdb1-e40c1f9bc6ed  # Jose Badilla
  bbaef322-dd56-4d16-86e8-2095d04842ec  # Swastika Mishra
  8670d252-1220-4745-8f73-e9467049a05e  # Carla Figueiredo
  fae84f28-804b-4cc5-96fe-d6b6f82943a6  # Edgar Gomes Goncalves
  0e849910-8d59-4bb0-8dfc-b4bbc07568aa  # Shubham Bansal
  e7b1bdfb-dc10-4d34-91fa-06d750c5c870  # Patrick Keenan
  1aec8171-32aa-469a-90a4-e474e520a6d2  # Sabine Hopmann López
  0098a4ce-31e6-4ede-9de1-e6f972661ca3  # Katyanna Moura
  1a59d208-ab30-4afa-8b95-a07b5208ec83  # Antonios Maronikolakis
  bc9168c2-501a-4405-be04-aafaa3276aa0  # Marta Skarzynska
  59de5d13-8d92-482f-b947-042eb4d65780  # Hala al Kuwatly
  73fb5898-4401-420d-b136-59e6bfa4c81a  # Alexander Kraskov
  6ee7b771-a0cf-4c19-b5bf-c32c43480371  # Alberto Perbellini
  480aa1c1-2726-4fb4-af7c-2444404ef78b  # Anna Khoreva
  6bb6e7f0-496a-474b-9d67-96a11a8416e9  # Valeriia Shcherbakova
  10dabfd9-8901-49f1-bce0-422dced9154d  # Iberê Floriano Rios
  b6b05810-05bd-4ace-8cf9-4af93932d282  # Mathis Hagen
  739880e5-bfda-42ee-8673-2a969c520342  # Larry Almeida
  cdccc1c9-a543-4b0a-8ca2-fb58ef56676f  # Agustina Cadenas
  21fe95d8-1ac3-46fd-8e40-f602dcd761c0  # Arun Yogeshwaran
  dca8f9f4-10c6-4c44-81cd-0297cef18a44  # Sanjeev Laha
  f459fe65-17fa-49b4-906b-14288c469de7  # Leonid Levitchi
  d02f1cab-9e0a-4628-9c1f-fb0da48f02b9  # Adrian Schiopu
  b0ea7ea8-282c-4192-9c93-927583dca1ed  # Selin Kozaneli
  a801f526-7a7f-419e-9ff8-6d71bab53403  # Nazrin Guliyeva
  32c0ed4c-61b1-4812-8aed-38ba86e52658  # MD Asaduzzaman
  ec6df75d-971b-4c4d-afb5-6e39aa67408e  # Ömür Yildirmaz
  8a50db09-a923-43b7-b65d-13bfb87d64ac  # Yilmaz Baris Kaplan
  5e3dca71-9038-4a67-9340-8e50eab38128  # Kevin Hobracht
  ab5ef0f1-5202-4f2e-a39a-f1166f4ce43c  # Youssef Hussien
  108414e3-a7dd-4f65-92e6-8ee32dc2cd6a  # Özgü Fidan
  8b027e45-8fe2-47d9-8748-c223944266c5  # Joe Tsui
  adc8e0be-c628-4e1b-8e28-c4dd3b6a56e0  # Neelam Shehzadi
  d19f52bc-6843-408a-be17-869dab910fd4  # Deepan Shanmugavel
  1ed4a8dd-87d0-4ce7-998f-b1d8e7dba5a5  # Vijay Thakur
)

echo "Downloading ${#DOC_IDS[@]} photos to $OUT_DIR ..."
FAILED=()

for id in "${DOC_IDS[@]}"; do
  out="$OUT_DIR/${id}.jpg"
  if [[ -f "$out" ]]; then
    echo "  skip  $id (already exists)"
    continue
  fi

  http_code=$(curl -s -o "$out" -w "%{http_code}" \
    -H "Cookie: COYOSESSION=${SESSION}" \
    -H "Referer: https://gwc-betriebsrat.github.io/" \
    -H "Sec-Fetch-Mode: no-cors" \
    -H "Sec-Fetch-Site: cross-site" \
    "${BASE_URL}/${id}?type=XL")

  if [[ "$http_code" == "200" ]]; then
    size=$(wc -c < "$out")
    echo "  OK    $id (${size} bytes)"
  else
    echo "  FAIL  $id (HTTP $http_code)"
    rm -f "$out"
    FAILED+=("$id")
  fi
done

echo ""
if [[ ${#FAILED[@]} -eq 0 ]]; then
  echo "All photos downloaded successfully."
else
  echo "Failed (${#FAILED[@]}):"
  for id in "${FAILED[@]}"; do echo "  $id"; done
fi
