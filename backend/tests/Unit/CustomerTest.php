<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CustomerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function test_can_create_customer()
    {
        $customerData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'contact_number' => '1234567890'
        ];

        $customer = Customer::create($customerData);

        $this->assertInstanceOf(Customer::class, $customer);
        $this->assertEquals($customerData['first_name'], $customer->first_name);
        $this->assertEquals($customerData['last_name'], $customer->last_name);
        $this->assertEquals($customerData['email'], $customer->email);
        $this->assertEquals($customerData['contact_number'], $customer->contact_number);
    }

    public function test_customer_fillable_attributes()
    {
        $customer = new Customer();
        $fillable = ['first_name', 'last_name', 'email', 'contact_number'];
        
        $this->assertEquals($fillable, $customer->getFillable());
    }

    public function test_can_update_customer()
    {
        $customer = Customer::factory()->create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'contact_number' => '1234567890'
        ]);

        $updatedData = [
            'first_name' => 'Jane',
            'email' => 'jane.doe@example.com'
        ];

        $customer->update($updatedData);
        $customer->refresh();

        $this->assertEquals('Jane', $customer->first_name);
        $this->assertEquals('jane.doe@example.com', $customer->email);
        $this->assertEquals('Doe', $customer->last_name); // Unchanged
        $this->assertEquals('1234567890', $customer->contact_number); // Unchanged
    }

    public function test_can_delete_customer()
    {
        $customer = Customer::factory()->create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'contact_number' => '1234567890'
        ]);

        $customerId = $customer->id;
        $customer->delete();

        $this->assertNull(Customer::find($customerId));
        $this->assertDatabaseMissing('customers', ['id' => $customerId]);
    }
}
