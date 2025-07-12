using APIShopLaptop.Middleware.Config;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RestSharp;
using System.Security.Cryptography;
using System.Text;

namespace APIShopLaptop.Middleware.Momo {
    public class MoMoService {
        private readonly IOptions<MoMoOption> _options;

        public MoMoService(IOptions<MoMoOption> options) {
            _options = options;
        }
        public async Task<MoMoCreatePayResponse> CreatePaymentAsync(string OrderId,string OrderInfo,float orderValue,string RequestId) {
            
            //var rawData =
            //$"partnerCode={_options.Value.PartnerCode}" +
            //$"&accessKey={_options.Value.AccessKey}" +
            //$"&requestId={requestId}" +
            //$"&amount={orderValue}" +
            //$"&orderId={OrderId}" +
            //$"&orderInfo={OrderInfo}" +
            //$"&returnUrl={_options.Value.ReturnUrl}" +
            //$"&notifyUrl={_options.Value.NotifyUrl}" +
            //$"&extraData=";
            var rawData =
           $"accessKey={_options.Value.AccessKey}" +
           $"&amount={orderValue}" +
           $"&extraData=" +
           $"&ipnUrl={_options.Value.IpnUrl}" +
           $"&orderId={OrderId}" +
           $"&orderInfo={OrderInfo}" +
           $"&partnerCode={_options.Value.PartnerCode}" +
           $"&redirectUrl={_options.Value.ReturnUrl}" +
           $"&requestId={RequestId}" +
           $"&requestType={_options.Value.RequestType}";

            var signature = ComputeHmacSha256(rawData, _options.Value.SercretKey);

            var client = new RestClient(_options.Value.MoMoApiUrl);
            var request = new RestRequest() { Method = Method.Post };
            request.AddHeader("Content-Type", "application/json; charset=UTF-8");
            // Create an object representing the request data
            var requestData = new {
                partnerCode = _options.Value.PartnerCode,
                requestId = RequestId,
                amount = orderValue.ToString(),
                orderId = OrderId,
                orderInfo = OrderInfo,
                redirectUrl = _options.Value.ReturnUrl,
                ipnUrl = _options.Value.IpnUrl,
                requestType = _options.Value.RequestType,
                extraData = "",
                lang = _options.Value.Lang,
                signature = signature,
                
            };
            request.AddParameter("application/json", JsonConvert.SerializeObject(requestData), ParameterType.RequestBody);

            var response = await client.ExecuteAsync(request);
            var momoResponse = JsonConvert.DeserializeObject<MoMoCreatePayResponse>(response.Content);
            return momoResponse;
        }

        private string ComputeHmacSha256(string message, string secretKey) {
            var keyBytes = Encoding.UTF8.GetBytes(secretKey);
            var messageBytes = Encoding.UTF8.GetBytes(message);

            byte[] hashBytes;

            using (var hmac = new HMACSHA256(keyBytes)) {
                hashBytes = hmac.ComputeHash(messageBytes);
            }

            var hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

            return hashString;
        }
    }

}
